package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Chapter.
 */
@Entity
@Table(name = "chapter")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Chapter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @NotNull
    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chapter")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "wordExamples", "userVocabularies", "chapter" }, allowSetters = true)
    private Set<Word> words = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chapter")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "grammarExamples", "userGrammars", "chapter" }, allowSetters = true)
    private Set<Grammar> grammars = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chapter")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "listeningExercises", "chapter" }, allowSetters = true)
    private Set<ListeningAudio> listeningAudios = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chapter")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "speakingExercises", "chapter" }, allowSetters = true)
    private Set<SpeakingTopic> speakingTopics = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chapter")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "readingExercises", "chapter" }, allowSetters = true)
    private Set<ReadingPassage> readingPassages = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chapter")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "writingExercises", "chapter" }, allowSetters = true)
    private Set<WritingTask> writingTasks = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chapter")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "appUser", "chapter" }, allowSetters = true)
    private Set<ChapterProgress> chapterProgresses = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "chapters", "bookReviews" }, allowSetters = true)
    private Book book;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Chapter id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Chapter title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getOrderIndex() {
        return this.orderIndex;
    }

    public Chapter orderIndex(Integer orderIndex) {
        this.setOrderIndex(orderIndex);
        return this;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public Set<Word> getWords() {
        return this.words;
    }

    public void setWords(Set<Word> words) {
        if (this.words != null) {
            this.words.forEach(i -> i.setChapter(null));
        }
        if (words != null) {
            words.forEach(i -> i.setChapter(this));
        }
        this.words = words;
    }

    public Chapter words(Set<Word> words) {
        this.setWords(words);
        return this;
    }

    public Chapter addWord(Word word) {
        this.words.add(word);
        word.setChapter(this);
        return this;
    }

    public Chapter removeWord(Word word) {
        this.words.remove(word);
        word.setChapter(null);
        return this;
    }

    public Set<Grammar> getGrammars() {
        return this.grammars;
    }

    public void setGrammars(Set<Grammar> grammars) {
        if (this.grammars != null) {
            this.grammars.forEach(i -> i.setChapter(null));
        }
        if (grammars != null) {
            grammars.forEach(i -> i.setChapter(this));
        }
        this.grammars = grammars;
    }

    public Chapter grammars(Set<Grammar> grammars) {
        this.setGrammars(grammars);
        return this;
    }

    public Chapter addGrammar(Grammar grammar) {
        this.grammars.add(grammar);
        grammar.setChapter(this);
        return this;
    }

    public Chapter removeGrammar(Grammar grammar) {
        this.grammars.remove(grammar);
        grammar.setChapter(null);
        return this;
    }

    public Set<ListeningAudio> getListeningAudios() {
        return this.listeningAudios;
    }

    public void setListeningAudios(Set<ListeningAudio> listeningAudios) {
        if (this.listeningAudios != null) {
            this.listeningAudios.forEach(i -> i.setChapter(null));
        }
        if (listeningAudios != null) {
            listeningAudios.forEach(i -> i.setChapter(this));
        }
        this.listeningAudios = listeningAudios;
    }

    public Chapter listeningAudios(Set<ListeningAudio> listeningAudios) {
        this.setListeningAudios(listeningAudios);
        return this;
    }

    public Chapter addListeningAudio(ListeningAudio listeningAudio) {
        this.listeningAudios.add(listeningAudio);
        listeningAudio.setChapter(this);
        return this;
    }

    public Chapter removeListeningAudio(ListeningAudio listeningAudio) {
        this.listeningAudios.remove(listeningAudio);
        listeningAudio.setChapter(null);
        return this;
    }

    public Set<SpeakingTopic> getSpeakingTopics() {
        return this.speakingTopics;
    }

    public void setSpeakingTopics(Set<SpeakingTopic> speakingTopics) {
        if (this.speakingTopics != null) {
            this.speakingTopics.forEach(i -> i.setChapter(null));
        }
        if (speakingTopics != null) {
            speakingTopics.forEach(i -> i.setChapter(this));
        }
        this.speakingTopics = speakingTopics;
    }

    public Chapter speakingTopics(Set<SpeakingTopic> speakingTopics) {
        this.setSpeakingTopics(speakingTopics);
        return this;
    }

    public Chapter addSpeakingTopic(SpeakingTopic speakingTopic) {
        this.speakingTopics.add(speakingTopic);
        speakingTopic.setChapter(this);
        return this;
    }

    public Chapter removeSpeakingTopic(SpeakingTopic speakingTopic) {
        this.speakingTopics.remove(speakingTopic);
        speakingTopic.setChapter(null);
        return this;
    }

    public Set<ReadingPassage> getReadingPassages() {
        return this.readingPassages;
    }

    public void setReadingPassages(Set<ReadingPassage> readingPassages) {
        if (this.readingPassages != null) {
            this.readingPassages.forEach(i -> i.setChapter(null));
        }
        if (readingPassages != null) {
            readingPassages.forEach(i -> i.setChapter(this));
        }
        this.readingPassages = readingPassages;
    }

    public Chapter readingPassages(Set<ReadingPassage> readingPassages) {
        this.setReadingPassages(readingPassages);
        return this;
    }

    public Chapter addReadingPassage(ReadingPassage readingPassage) {
        this.readingPassages.add(readingPassage);
        readingPassage.setChapter(this);
        return this;
    }

    public Chapter removeReadingPassage(ReadingPassage readingPassage) {
        this.readingPassages.remove(readingPassage);
        readingPassage.setChapter(null);
        return this;
    }

    public Set<WritingTask> getWritingTasks() {
        return this.writingTasks;
    }

    public void setWritingTasks(Set<WritingTask> writingTasks) {
        if (this.writingTasks != null) {
            this.writingTasks.forEach(i -> i.setChapter(null));
        }
        if (writingTasks != null) {
            writingTasks.forEach(i -> i.setChapter(this));
        }
        this.writingTasks = writingTasks;
    }

    public Chapter writingTasks(Set<WritingTask> writingTasks) {
        this.setWritingTasks(writingTasks);
        return this;
    }

    public Chapter addWritingTask(WritingTask writingTask) {
        this.writingTasks.add(writingTask);
        writingTask.setChapter(this);
        return this;
    }

    public Chapter removeWritingTask(WritingTask writingTask) {
        this.writingTasks.remove(writingTask);
        writingTask.setChapter(null);
        return this;
    }

    public Set<ChapterProgress> getChapterProgresses() {
        return this.chapterProgresses;
    }

    public void setChapterProgresses(Set<ChapterProgress> chapterProgresses) {
        if (this.chapterProgresses != null) {
            this.chapterProgresses.forEach(i -> i.setChapter(null));
        }
        if (chapterProgresses != null) {
            chapterProgresses.forEach(i -> i.setChapter(this));
        }
        this.chapterProgresses = chapterProgresses;
    }

    public Chapter chapterProgresses(Set<ChapterProgress> chapterProgresses) {
        this.setChapterProgresses(chapterProgresses);
        return this;
    }

    public Chapter addChapterProgress(ChapterProgress chapterProgress) {
        this.chapterProgresses.add(chapterProgress);
        chapterProgress.setChapter(this);
        return this;
    }

    public Chapter removeChapterProgress(ChapterProgress chapterProgress) {
        this.chapterProgresses.remove(chapterProgress);
        chapterProgress.setChapter(null);
        return this;
    }

    public Book getBook() {
        return this.book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Chapter book(Book book) {
        this.setBook(book);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Chapter)) {
            return false;
        }
        return getId() != null && getId().equals(((Chapter) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Chapter{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", orderIndex=" + getOrderIndex() +
            "}";
    }
}
