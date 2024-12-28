const express = require('express');
const router = express.Router();
const multer = require('multer');
const dropboxService = require('../services/dropboxService');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.array('files'), async (req, res) => {
  try {
    const uploadPromises = req.files.map(file => 
      dropboxService.uploadFile(file, 'uploads')
    );

    await Promise.all(uploadPromises);
    res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;