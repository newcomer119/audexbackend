require('dotenv').config();
global.fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const uploadRouter = require('./routes/upload');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Add this debugging code
console.log('Environment check:');
console.log('DROPBOX_ACCESS_TOKEN exists:', !!process.env.DROPBOX_ACCESS_TOKEN);
console.log('DROPBOX_ACCESS_TOKEN first 5 chars:', process.env.DROPBOX_ACCESS_TOKEN?.slice(0, 5));

// Routes
app.use('/api/upload', uploadRouter);

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// For specific route
app.post('/api/upload', cors(), (req, res) => {
    // Add this to debug your incoming request
    console.log('Received upload request');
    console.log('Files:', req.files);
    console.log('Body:', req.body);
    
    res.json({ message: 'Upload endpoint reached' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});