import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ currentNote, onSave, onCancel }) => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    category: 'General'
  });

  useEffect(() => {
    if (currentNote) {
      setNote(currentNote);
    } else {
      setNote({
        title: '',
        content: '',
        category: 'General'
      });
    }
  }, [currentNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(note);
  };

  return (
    <div className="note-form-container">
      <h2>{currentNote ? 'Edit Note' : 'Add New Note'}</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={note.category}
            onChange={handleChange}
            className="form-control"
          >
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
            <option value="Reminder">Reminder</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={note.content}
            onChange={handleChange}
            className="form-control note-textarea"
            rows="6"
          ></textarea>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {currentNote ? 'Update Note' : 'Add Note'}
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;