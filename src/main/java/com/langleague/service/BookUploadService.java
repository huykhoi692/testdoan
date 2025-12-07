package com.langleague.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.langleague.domain.*;
import com.langleague.domain.enumeration.UploadStatus;
import com.langleague.repository.*;
import com.langleague.security.SecurityUtils;
import com.langleague.service.dto.*;
import com.langleague.service.dto.BookExtractionDTO.ChapterExtractionDTO;
import com.langleague.service.dto.BookExtractionDTO.ExerciseExtractionDTO;
import com.langleague.service.mapper.BookUploadMapper;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service for processing book uploads from staff
 */
@Service
@Transactional
public class BookUploadService {

    private static final Logger LOG = LoggerFactory.getLogger(BookUploadService.class);
    private static final int MAX_RETRIES = 3;
    private static final String UPLOAD_FOLDER = "documents";

    private final BookUploadRepository bookUploadRepository;
    private final BookRepository bookRepository;
    private final ChapterRepository chapterRepository;
    private final AppUserRepository appUserRepository;
    private final ListeningExerciseRepository listeningExerciseRepository;
    private final ReadingExerciseRepository readingExerciseRepository;
    private final SpeakingExerciseRepository speakingExerciseRepository;
    private final WritingExerciseRepository writingExerciseRepository;
    private final FileStorageService fileStorageService;
    private final ChatbotService chatbotService;
    private final ObjectMapper objectMapper;
    private final BookUploadMapper bookUploadMapper;

    public BookUploadService(
        BookUploadRepository bookUploadRepository,
        BookRepository bookRepository,
        ChapterRepository chapterRepository,
        AppUserRepository appUserRepository,
        ListeningExerciseRepository listeningExerciseRepository,
        ReadingExerciseRepository readingExerciseRepository,
        SpeakingExerciseRepository speakingExerciseRepository,
        WritingExerciseRepository writingExerciseRepository,
        FileStorageService fileStorageService,
        ChatbotService chatbotService,
        ObjectMapper objectMapper,
        BookUploadMapper bookUploadMapper
    ) {
        this.bookUploadRepository = bookUploadRepository;
        this.bookRepository = bookRepository;
        this.chapterRepository = chapterRepository;
        this.appUserRepository = appUserRepository;
        this.listeningExerciseRepository = listeningExerciseRepository;
        this.readingExerciseRepository = readingExerciseRepository;
        this.speakingExerciseRepository = speakingExerciseRepository;
        this.writingExerciseRepository = writingExerciseRepository;
        this.fileStorageService = fileStorageService;
        this.chatbotService = chatbotService;
        this.objectMapper = objectMapper;
        this.bookUploadMapper = bookUploadMapper;
    }

    /**
     * Upload a file and create BookUpload record
     */
    public BookUploadDTO initiateUpload(MultipartFile file) throws Exception {
        LOG.info("Initiating book upload for file: {}", file.getOriginalFilename());

        // Validate file
        validateFile(file);

        // Get current user
        String userLogin = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new Exception("Current user login not found"));

        // Store file
        String fileName = fileStorageService.storeFile(file, UPLOAD_FOLDER, userLogin);
        String fileUrl = "/uploads/" + UPLOAD_FOLDER + "/" + fileName;

        // Get AppUser
        AppUser appUser = appUserRepository
            .findByInternalUser_Login(userLogin)
            .orElseThrow(() -> new Exception("AppUser not found for login: " + userLogin));

        // Create BookUpload record
        BookUpload bookUpload = new BookUpload();
        bookUpload.setOriginalFileName(file.getOriginalFilename());
        bookUpload.setFileUrl(fileUrl);
        bookUpload.setStatus(UploadStatus.PENDING);
        bookUpload.setUploadedBy(appUser);
        bookUpload.setUploadedAt(Instant.now());
        bookUpload.setRetryCount(0);

        bookUpload = bookUploadRepository.save(bookUpload);

        // Process async
        processUploadAsync(bookUpload.getId(), file);

        return bookUploadMapper.toDto(bookUpload);
    }

    /**
     * Process upload asynchronously
     */
    @Async
    public void processUploadAsync(Long uploadId, MultipartFile file) {
        LOG.info("Starting async processing for upload ID: {}", uploadId);

        try {
            // Update status to PROCESSING
            updateUploadStatus(uploadId, UploadStatus.PROCESSING);

            // Extract book info using chatbot
            BookExtractionDTO extractionDTO = chatbotService.extractBookInfo(file);
            chatbotService.validateExtraction(extractionDTO);

            // Save chatbot response
            String chatbotResponse = objectMapper.writeValueAsString(extractionDTO);
            BookUpload upload = bookUploadRepository.findById(uploadId).orElseThrow();
            upload.setChatbotResponse(chatbotResponse);
            bookUploadRepository.save(upload);

            // Create book and chapters
            Book createdBook = createBookFromExtraction(extractionDTO, upload);

            // Update upload record
            upload.setCreatedBook(createdBook);
            upload.setStatus(UploadStatus.COMPLETED);
            upload.setProcessedAt(Instant.now());
            bookUploadRepository.save(upload);

            LOG.info("Successfully processed upload ID: {}", uploadId);
        } catch (Exception e) {
            LOG.error("Failed to process upload ID: {}", uploadId, e);
            handleProcessingError(uploadId, e);
        }
    }

    /**
     * Create Book and Chapters from extraction DTO
     */
    private Book createBookFromExtraction(BookExtractionDTO extractionDTO, BookUpload upload) {
        LOG.info("Creating book from extraction: {} for upload ID: {}", extractionDTO.getTitle(), upload.getId());

        // Create Book
        Book book = new Book();
        book.setTitle(extractionDTO.getTitle());
        book.setLevel(extractionDTO.getLevel());
        book.setDescription(extractionDTO.getDescription());
        book.setThumbnail(extractionDTO.getThumbnailUrl());
        book.setIsActive(true);
        book.setAverageRating(0.0);
        book.setTotalReviews(0L);

        book = bookRepository.save(book);

        // Create Chapters
        if (extractionDTO.getChapters() != null) {
            for (ChapterExtractionDTO chapterDTO : extractionDTO.getChapters()) {
                createChapter(chapterDTO, book);
            }
        }

        return book;
    }

    /**
     * Create Chapter from extraction DTO
     */
    private void createChapter(ChapterExtractionDTO chapterDTO, Book book) {
        Chapter chapter = new Chapter();
        chapter.setTitle(chapterDTO.getTitle());
        // Note: Chapter entity doesn't have description field
        // chapter.setDescription(chapterDTO.getDescription());
        chapter.setOrderIndex(chapterDTO.getOrderIndex());
        chapter.setBook(book);

        chapter = chapterRepository.save(chapter);

        // Create Exercises
        if (chapterDTO.getExercises() != null) {
            for (ExerciseExtractionDTO exerciseDTO : chapterDTO.getExercises()) {
                createExercise(exerciseDTO, chapter);
            }
        }
    }

    /**
     * Create Exercise based on type
     * Note: This is a simplified implementation. You may need to adjust fields based on actual entity structure
     */
    private void createExercise(ExerciseExtractionDTO exerciseDTO, Chapter chapter) {
        String type = exerciseDTO.getType().toUpperCase();

        try {
            switch (type) {
                case "LISTENING":
                    ListeningExercise listeningExercise = new ListeningExercise();
                    listeningExercise.setAudioPath(exerciseDTO.getContent()); // Using content as audio path
                    listeningExercise.setQuestion(exerciseDTO.getTitle() != null ? exerciseDTO.getTitle() : "Listening exercise");
                    listeningExercise.setMaxScore(100);
                    listeningExercise.setChapter(chapter);
                    listeningExerciseRepository.save(listeningExercise);
                    break;
                case "READING":
                    ReadingExercise readingExercise = new ReadingExercise();
                    readingExercise.setPassage(exerciseDTO.getContent());
                    readingExercise.setQuestion(exerciseDTO.getTitle() != null ? exerciseDTO.getTitle() : "Reading exercise");
                    readingExercise.setMaxScore(100);
                    readingExercise.setChapter(chapter);
                    readingExerciseRepository.save(readingExercise);
                    break;
                case "SPEAKING":
                    SpeakingExercise speakingExercise = new SpeakingExercise();
                    speakingExercise.setPrompt(exerciseDTO.getContent());
                    speakingExercise.setMaxScore(100);
                    speakingExercise.setChapter(chapter);
                    speakingExerciseRepository.save(speakingExercise);
                    break;
                case "WRITING":
                    WritingExercise writingExercise = new WritingExercise();
                    writingExercise.setPrompt(exerciseDTO.getContent());
                    writingExercise.setMaxScore(100);
                    writingExercise.setChapter(chapter);
                    writingExerciseRepository.save(writingExercise);
                    break;
                default:
                    LOG.warn("Unknown exercise type: {}", type);
            }
        } catch (Exception e) {
            LOG.error("Failed to create exercise of type {}: {}", type, e.getMessage());
            // Continue processing other exercises
        }
    }

    /**
     * Validate uploaded file
     */
    private void validateFile(MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            throw new Exception("File is empty");
        }

        // Check file size (max 50MB)
        long maxSize = 50 * 1024 * 1024; // 50MB
        if (file.getSize() > maxSize) {
            throw new Exception("File size exceeds maximum limit of 50MB");
        }

        // Check file type
        String contentType = file.getContentType();
        List<String> allowedTypes = List.of(
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
            "text/plain"
        );

        if (contentType == null || !allowedTypes.contains(contentType)) {
            throw new Exception("Invalid file type. Allowed types: PDF, DOCX, DOC, TXT");
        }
    }

    /**
     * Update upload status
     */
    private void updateUploadStatus(Long uploadId, UploadStatus status) {
        bookUploadRepository
            .findById(uploadId)
            .ifPresent(upload -> {
                upload.setStatus(status);
                bookUploadRepository.save(upload);
            });
    }

    /**
     * Handle processing error with retry logic
     */
    private void handleProcessingError(Long uploadId, Exception e) {
        bookUploadRepository
            .findById(uploadId)
            .ifPresent(upload -> {
                int retryCount = upload.getRetryCount() != null ? upload.getRetryCount() : 0;

                if (retryCount < MAX_RETRIES) {
                    upload.setRetryCount(retryCount + 1);
                    upload.setStatus(UploadStatus.PENDING);
                    upload.setErrorMessage("Retry " + (retryCount + 1) + ": " + e.getMessage());
                } else {
                    upload.setStatus(UploadStatus.FAILED);
                    upload.setErrorMessage("Failed after " + MAX_RETRIES + " retries: " + e.getMessage());
                    upload.setProcessedAt(Instant.now());
                }

                bookUploadRepository.save(upload);
            });
    }

    /**
     * Get all uploads for current staff
     */
    @Transactional(readOnly = true)
    public List<BookUploadDTO> getMyUploads() {
        String userLogin = SecurityUtils.getCurrentUserLogin().orElseThrow();
        AppUser appUser = appUserRepository.findByInternalUser_Login(userLogin).orElseThrow();

        return bookUploadRepository
            .findByUploadedBy_IdOrderByUploadedAtDesc(appUser.getId())
            .stream()
            .map(bookUploadMapper::toDto)
            .toList();
    }

    /**
     * Get upload by ID
     */
    @Transactional(readOnly = true)
    public Optional<BookUploadDTO> getUploadById(Long id) {
        return bookUploadRepository.findById(id).map(bookUploadMapper::toDto);
    }

    /**
     * Retry failed upload
     */
    public void retryUpload(Long uploadId) throws Exception {
        BookUpload upload = bookUploadRepository.findById(uploadId).orElseThrow(() -> new Exception("Upload not found"));

        if (upload.getStatus() != UploadStatus.FAILED) {
            throw new Exception("Only failed uploads can be retried");
        }

        upload.setStatus(UploadStatus.PENDING);
        upload.setRetryCount(0);
        upload.setErrorMessage(null);
        bookUploadRepository.save(upload);

        // TODO: Reload file and process again
        LOG.info("Upload {} queued for retry", uploadId);
    }
}
