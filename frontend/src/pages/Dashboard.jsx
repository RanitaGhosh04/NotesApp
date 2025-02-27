import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteItem from '../components/NoteItem';
import NoteForm from '../components/NoteForm';
import './Dashboard.css';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/notes');
      setNotes(res.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch notes. Please try again.');
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNew = () => {
    setCurrentNote(null);
    setShowForm(true);
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`http://localhost:5000/api/notes/${id}`);
        setNotes(notes.filter(note => note._id !== id));
      } catch (error) {
        setError('Failed to delete note. Please try again.');
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleSave = async (noteData) => {
    try {
      if (currentNote) {
        
        const res = await axios.put(`http://localhost:5000/api/notes/${currentNote._id}`, noteData);
        setNotes(notes.map(note => note._id === currentNote._id ? res.data : note));
      } else {
       
        const res = await axios.post('http://localhost:5000/api/notes', noteData);
        setNotes([...notes, res.data]);
      }
      setShowForm(false);
      setCurrentNote(null);
    } catch (error) {
      setError('Failed to save note. Please try again.');
      console.error('Error saving note:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentNote(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? note.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  
  const categories = ['', ...new Set(notes.map(note => note.category))];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Notes</h1>
        <button onClick={handleAddNew} className="btn btn-primary">Add New Note</button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="dashboard-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
        <div className="category-filter">
          <select 
            value={filterCategory} 
            onChange={handleFilterChange}
            className="form-control"
          >
            <option value="">All Categories</option>
            {categories.filter(cat => cat).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <NoteForm 
          currentNote={currentNote} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      )}

      {loading ? (
        <div className="loading">Loading notes...</div>
      ) : filteredNotes.length === 0 ? (
        <div className="no-notes">
          {notes.length === 0 ? 
            "You don't have any notes yet. Click 'Add New Note' to create one." : 
            "No notes match your search criteria."}
        </div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map(note => (
            <NoteItem 
              key={note._id} 
              note={note} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;