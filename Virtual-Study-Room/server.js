const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();

const PORT = 10002;


// Connect to MongoDB
mongoose.connect('mongodb+srv://sonamyadav90990:WKVUZJvV4WATZFUc@cluster0.36v3lwh.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// File Schema
const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'notesApp', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'notesApp', 'uploads')));

// Upload file
app.post('/api/files/upload', upload.single('file'), async (req, res) => {
    try {
        const relativePath = `/uploads/${req.file.originalname}`;

        const newFile = new File({
            filename: req.file.originalname,
            path: relativePath,
            mimetype: req.file.mimetype
        });

        await newFile.save();
        res.status(201).json({
            message: 'File uploaded successfully',
            file: {
                filename: newFile.filename,
                path: relativePath,
                mimetype: newFile.mimetype,
                _id: newFile._id
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});

// Search files
app.get('/api/files/search', async (req, res) => {
    try {
        const { filename } = req.query;
        const files = await File.find({
            filename: { $regex: filename || '', $options: 'i' }
        });
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: 'Error searching files', error: error.message });
    }
});

// Delete file
app.delete('/api/files/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ message: 'File not found' });

        // Construct actual file path on server
        const absolutePath = path.join(__dirname, 'public', 'notesApp', file.path.replace('/uploads/', 'uploads/'));

        fs.unlinkSync(absolutePath); // Delete from filesystem
        await File.findByIdAndDelete(req.params.id); // Delete from DB

        res.json({ message: 'File deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete file', error: err.message });
    }
});

// Static routes
app.use('/video', express.static(path.join(__dirname, 'public', 'videoChat', 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home', 'index.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home', 'auth.html'));
});

app.get('/video', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'videoChat', 'dist', 'index.html'));
});

app.get('/files', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notesApp', 'public', 'index.html'));
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.io setup
const io = socketio(server);
const users = {};

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('new-user', (username) => {
        users[socket.id] = username;
        socket.broadcast.emit('user-connected', username);
        io.emit('update-users', Object.values(users));
    });

    socket.on('send-chat-message', (message) => {
        socket.broadcast.emit('chat-message', {
            message,
            username: users[socket.id]
        });
    });

    socket.on('typing', () => {
        socket.broadcast.emit('user-typing', users[socket.id]);
    });

    socket.on('disconnect', () => {
        const username = users[socket.id];
        delete users[socket.id];
        socket.broadcast.emit('user-disconnected', username);
        io.emit('update-users', Object.values(users));
        console.log('User disconnected');
    });
});
