const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const note = new Note({
      title,
      content,
      category,
      user: req.user.userId 
    });
    
    await note.save();
    
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    
    const note = await Note.findById(id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    if (note.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this note' });
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true }
    );
    
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    
    const note = await Note.findById(id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    if (note.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }
    
    await Note.findByIdAndDelete(id);
    
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};