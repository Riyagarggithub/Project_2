const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
const PORT =  10002;

// Connect to MongoDB
mongoose.connect('mongodb+srv://rirurugarg:8qjoiDxOpo9fEjLf@ytcluster.uvzz7xt.mongodb.net/?retryWrites=true&w=majority&appName=YTCluster', {
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

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'notesApp', 'uploads')));
// File upload route
app.post('/api/files/upload', upload.single('file'), async (req, res) => {
    try {
        const newFile = new File({
            filename: req.file.originalname,
            path: req.file.path,
            mimetype: req.file.mimetype
        });
        await newFile.save();
        res.status(201).json({ 
            message: 'File uploaded successfully', 
            file: newFile
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});


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

// Serve uploaded files
app.delete('/api/files/:id', async (req, res) => {
  try {
      const file = await File.findById(req.params.id);
      if (!file) return res.status(404).json({ message: 'File not found' });

      fs.unlinkSync(file.path); // Delete the file from uploads folder
      await File.findByIdAndDelete(req.params.id); // Remove from DB

      res.json({ message: 'File deleted successfully' });
  } catch (err) {
      res.status(500).json({ message: 'Failed to delete file', error: err });
  }
});
app.use('/video', express.static(path.join(__dirname, 'public', 'videoChat', 'dist')));
// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','home', 'index.html'));
});
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','chat', 'index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home','auth.html'));
});
app.get('/video', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'videoChat', 'dist', 'index.html'));
});
app.get('/files', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'notesApp','public','index.html'));
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Initialize Socket.io
const io = socketio(server);

// Store connected users
const users = {};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New user connected');

  // When a new user joins
  socket.on('new-user', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('user-connected', username);
    io.emit('update-users', Object.values(users));
  });

  // When a message is sent
  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', {
      message,
      username: users[socket.id]
    });
  });

  // When someone is typing
  socket.on('typing', () => {
    socket.broadcast.emit('user-typing', users[socket.id]);
  });

  // When user disconnects
  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete users[socket.id];
    socket.broadcast.emit('user-disconnected', username);
    io.emit('update-users', Object.values(users));
    console.log('User disconnected');
  });
});
