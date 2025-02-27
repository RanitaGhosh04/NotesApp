import React from 'react';
import './NoteItem.css';

const NoteItem = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <span className="note-category">{note.category}</span>
      </div>
      <div className="note-content">
        <p>{note.content || 'No content'}</p>
      </div>
      <div className="note-footer">
        <span className="note-date">Updated: {formatDate(note.updatedAt)}</span>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="btn btn-primary">Edit</button>
          <button onClick={() => onDelete(note._id)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;