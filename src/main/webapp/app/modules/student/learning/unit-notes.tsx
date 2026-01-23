import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getNotesByUnit, createNote, updateNote, deleteNote, reset } from 'app/shared/reducers/note.reducer';
import { Translate, translate } from 'react-jhipster';
import { INote } from 'app/shared/model/note.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Button } from 'reactstrap';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import './unit-notes.scss';
import MarkdownNoteEditor from 'app/shared/components/markdown-editor/markdown-note-editor';

// import { useDebounce } from 'use-debounce';

interface IUnitNotesProps {
  unitId: number;
  onClose?: () => void;
}

export const UnitNotes = ({ unitId, onClose }: IUnitNotesProps) => {
  const dispatch = useAppDispatch();
  const noteState = useAppSelector(state => state.note);

  const { entities: notes = [], loading, updating, errorMessage } = noteState || {};

  // Note state
  const [existingNote, setExistingNote] = useState<INote | null>(null);
  const [hasNote, setHasNote] = useState(false);
  const [content, setContent] = useState('');

  // UI state
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Load notes logic (Giữ nguyên)
  useEffect(() => {
    const controller = new AbortController();
    setExistingNote(null);
    setHasNote(false);
    setContent('');
    setIsEditing(false);

    const fetchNotes = async () => {
      if (unitId) {
        try {
          await dispatch(getNotesByUnit(unitId));
        } catch (error) {
          console.error('Failed to fetch notes:', error);
        }
      }
    };

    fetchNotes();

    return () => {
      controller.abort();
      dispatch(reset());
    };
  }, [dispatch, unitId]);

  // Update local state when notes are loaded
  useEffect(() => {
    console.warn('[unit-notes] useEffect triggered - unitId:', unitId, 'notes.length:', notes?.length, 'loading:', loading);

    if (notes && notes.length > 0) {
      // Find the note that matches the current unitId
      // Use strict comparison (===) with explicit type conversion
      const foundNote = notes.find(note => {
        const noteUnitId = note.unitId;
        // Convert both to numbers for strict comparison to handle potential type mismatches
        const matches = Number(noteUnitId) === Number(unitId);
        console.warn('[unit-notes] Checking note:', {
          noteId: note.id,
          noteUnitId,
          currentUnitId: unitId,
          matches,
          noteUnitIdType: typeof noteUnitId,
          unitIdType: typeof unitId,
        });
        return matches;
      });

      if (foundNote) {
        console.warn('[unit-notes] ✅ Found existing note:', {
          noteId: foundNote.id,
          noteUnitId: foundNote.unitId,
          hasContent: !!foundNote.content,
        });

        setExistingNote(foundNote);
        setHasNote(true);

        // Only update content from server when NOT in edit mode
        // This prevents overwriting user's unsaved changes
        if (!isEditing) {
          setContent(foundNote.content || '');
        }

        // If note ID changed (switched to different unit), force update content
        if (existingNote && existingNote.id !== foundNote.id) {
          console.warn('[unit-notes] Note ID changed, updating content');
          setContent(foundNote.content || '');
          setIsEditing(false); // Exit edit mode when switching units
        }
      } else {
        console.warn('[unit-notes] ⚠️ No matching note found for unitId:', unitId);
        // No note exists for this unit
        setExistingNote(null);
        setHasNote(false);
        if (!isEditing) setContent('');
      }
    } else if (!loading) {
      console.warn('[unit-notes] ℹ️ No notes in list and not loading - unit has no notes');
      // No note exists for this unit
      setExistingNote(null);
      setHasNote(false);
      if (!isEditing) setContent('');
    }
  }, [notes, loading, unitId]);

  // [CHANGE 3] ĐÃ XÓA useEffect Auto-save
  // Không còn đoạn code theo dõi debouncedContent nữa.

  const handleAddNote = () => {
    setIsEditing(true);
    setShowPreview(false);
    if (!hasNote) setContent('');
  };

  const handleEditNote = () => {
    setIsEditing(true);
    setShowPreview(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setShowPreview(false);
    if (existingNote) {
      setContent(existingNote.content);
    } else {
      setContent('');
    }
  };

  const handleDelete = async () => {
    if (updating) return;
    if (existingNote && existingNote.id) {
      if (window.confirm(translate('langleague.student.learning.notes.deleteConfirm'))) {
        await dispatch(deleteNote({ id: existingNote.id, unitId }));
        setIsEditing(false);
        setExistingNote(null);
        setHasNote(false);
        setContent('');
      }
    }
  };

  // Upsert logic: Create or Update based on existingNote.id
  const handleSave = async (editorContent?: string) => {
    console.warn('[unit-notes] ═══ handleSave START ═══');
    console.warn('[unit-notes] State snapshot:', {
      existingNoteId: existingNote?.id,
      existingNoteUnitId: existingNote?.unitId,
      currentUnitId: unitId,
      hasNote,
      updating,
      notesInState: notes?.length,
    });

    if (updating) {
      console.warn('[unit-notes] ⚠️ Save operation already in progress');
      return;
    }

    // Get content from parameter (if provided) or from state
    const contentToSave = typeof editorContent === 'string' ? editorContent : content;
    const trimmedContent = contentToSave.trim();

    // If content is empty, delete the note if it exists
    if (!trimmedContent) {
      if (existingNote && existingNote.id) {
        console.warn('[unit-notes] Empty content, deleting note:', existingNote.id);
        await handleDelete();
      } else {
        console.warn('[unit-notes] Empty content, no note to delete');
        // Just clear and exit edit mode if no note exists
        setContent('');
        setIsEditing(false);
      }
      return;
    }

    try {
      // **STRICT UPSERT LOGIC: Check if note exists by ID**
      if (existingNote && existingNote.id) {
        // === UPDATE EXISTING NOTE ===
        console.warn(`[unit-notes] ✅ UPDATE mode - Updating existing note with ID: ${existingNote.id} for unitId: ${unitId}`);

        const updatedNote: INote = {
          ...existingNote,
          content: trimmedContent,
          updatedAt: dayjs().toISOString(),
        };

        const result = await dispatch(updateNote(updatedNote));

        if (updateNote.fulfilled.match(result)) {
          // Update successful - update local state
          const updatedEntity = result.payload.data;
          console.warn('[unit-notes] ✅ Note updated successfully:', updatedEntity.id);
          setExistingNote(updatedEntity);
          setContent(updatedEntity.content || '');
          setIsEditing(false);
        } else if (updateNote.rejected.match(result)) {
          console.error('[unit-notes] ❌ Failed to update note:', result.error);
        }
      } else {
        // === CREATE NEW NOTE ===
        console.warn(
          `[unit-notes] ➕ CREATE mode - Creating new note for unitId: ${unitId} (existingNote: ${existingNote ? 'exists but no ID' : 'null'})`,
        );

        const newNote: INote = {
          content: trimmedContent,
          unitId,
          createdAt: dayjs().toISOString(),
        };

        const result = await dispatch(createNote(newNote));

        if (createNote.fulfilled.match(result)) {
          // Create successful - update local state with returned entity (including ID)
          // Note: Backend may return an existing note if duplicate was detected
          const createdEntity = result.payload.data;
          console.warn(`[unit-notes] ✅ Note saved successfully with ID: ${createdEntity.id} for unitId: ${createdEntity.unitId}`);

          // Check if the returned note already existed (backend prevented duplicate)
          if (existingNote && existingNote.id === createdEntity.id) {
            console.warn('[unit-notes] ℹ️ Backend detected duplicate and updated existing note');
          }

          setExistingNote(createdEntity);
          setHasNote(true);
          setContent(createdEntity.content || '');
          setIsEditing(false);
        } else if (createNote.rejected.match(result)) {
          console.error('[unit-notes] ❌ Failed to create note:', result.error);
          // Check if error is duplicate note error
          const error = result.error;
          if (error && (error.message?.includes('duplicatenote') || error.message?.includes('already exists'))) {
            console.warn('[unit-notes] ⚠️ Duplicate note detected - refetching notes to sync state');
            // Refetch notes to get the existing note and update local state
            await dispatch(getNotesByUnit(unitId));
          }
          // Error will be shown via errorMessage in Redux state
        }
      }
    } catch (error) {
      console.error('[unit-notes] ❌ Unexpected error during save operation:', error);
    }
  };

  const togglePreview = () => setShowPreview(!showPreview);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const isFetching = loading && !updating;

  return (
    <div className={`notes-widget-container ${isExpanded ? 'expanded' : ''}`}>
      {/* Header */}
      <div className="notes-header">
        <div className="header-title">
          <h3>
            <FontAwesomeIcon icon="sticky-note" className="me-2" />
            <Translate contentKey="langleague.student.learning.notes.title">My Personal Notes</Translate>
          </h3>
          {existingNote && existingNote.updatedAt && !isEditing && (
            <span className="last-updated">
              <FontAwesomeIcon icon="clock" className="me-1" />
              <Translate contentKey="langleague.student.learning.notes.lastUpdated">Last updated</Translate>:{' '}
              {dayjs(existingNote.updatedAt).format('DD/MM/YYYY HH:mm')}
            </span>
          )}
        </div>
        <div className="header-controls">
          {/* Controls giữ nguyên */}
          {isEditing && (
            <button className="control-btn" onClick={togglePreview} title={showPreview ? 'Edit' : 'Preview'}>
              <FontAwesomeIcon icon={showPreview ? 'edit' : 'eye'} />
            </button>
          )}
          <button className="control-btn" onClick={toggleExpanded}>
            <FontAwesomeIcon icon={isExpanded ? 'compress-arrows-alt' : 'expand-arrows-alt'} />
          </button>
          {onClose && (
            <button className="control-btn close-btn" onClick={onClose}>
              <FontAwesomeIcon icon="times" />
            </button>
          )}
        </div>
      </div>

      {errorMessage && (
        <Alert color="danger" className="m-3">
          <FontAwesomeIcon icon="exclamation-triangle" className="me-2" />
          {errorMessage}
        </Alert>
      )}

      {/* Content Area */}
      <div className="notes-content-wrapper">
        {isFetching && !existingNote ? (
          <div className="loading-state">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : !hasNote && !isEditing ? (
          <div className="empty-note-state">
            <div className="empty-icon">
              <FontAwesomeIcon icon="sticky-note" size="3x" />
            </div>
            <p className="empty-message">
              <Translate contentKey="langleague.student.learning.notes.empty">No notes for this unit yet.</Translate>
            </p>
            <Button color="primary" onClick={handleAddNote} disabled={isFetching}>
              <FontAwesomeIcon icon="plus" className="me-2" />
              <Translate contentKey="langleague.student.learning.notes.addButton">Add Note</Translate>
            </Button>
          </div>
        ) : hasNote && !isEditing ? (
          <div className="note-view-mode">
            <MarkdownNoteEditor
              initialValue={existingNote?.content || ''}
              // Chế độ View mode vẫn có thể bấm edit
              onSave={handleSave}
              onDelete={handleDelete}
              placeholder={translate('langleague.student.learning.notes.placeholder')}
              isUpdate={true}
              readOnly={true}
              showEditButton={true}
              onEdit={handleEditNote}
              disabled={isFetching}
            />
          </div>
        ) : (
          <div className="note-edit-mode">
            <MarkdownNoteEditor
              value={content}
              onChange={setContent}
              // [CHANGE 4] Props onSave này sẽ được kích hoạt khi user bấm nút Save trên giao diện
              onSave={() => handleSave(content)}
              onDelete={hasNote ? handleDelete : undefined}
              onCancel={handleCancelEdit}
              placeholder={translate('langleague.student.learning.notes.placeholder')}
              isUpdate={hasNote}
              readOnly={false}
              showPreview={showPreview}
              disabled={isFetching || updating} // Có thể disable khi đang lưu thủ công
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitNotes;
