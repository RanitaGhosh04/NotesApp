const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', noteController.getNotes);

router.post('/', noteController.createNote);

router.put('/:id', noteController.updateNote);

router.delete('/:id', noteController.deleteNote);

module.exports = router;