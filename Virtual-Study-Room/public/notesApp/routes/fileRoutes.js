const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to upload a file
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const newFile = new File({
            filename: req.file.originalname,
            path: req.file.path,
            mimetype: req.file.mimetype
        });
        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});

// Route to search files by name
router.get('/search', async (req, res) => {
    const { filename } = req.query;
    try {
        const files = await File.find({
            filename: { $regex: filename || '', $options: 'i' }
        });
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong', details: err.message });
    }
});

router.put('/rename/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ message: 'File not found' });

        const newName = req.body.newFilename;
        const oldPath = file.path;
        const dirName = path.dirname(oldPath);
        const newPath = path.join(dirName, newName);

        fs.renameSync(oldPath, newPath);

        file.filename = newName;
        file.path = newPath;
        await file.save();

        res.json({ message: 'Filename updated successfully', file });
    } catch (err) {
        res.status(500).json({ message: 'Failed to rename file', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ message: 'File not found' });

        fs.unlinkSync(file.path); // Delete the file from uploads folder
        await File.findByIdAndDelete(req.params.id); // Remove from DB

        res.json({ message: 'File deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete file', error: err.message });
    }
});

module.exports = router;