const dropbox = require('../config/dropbox');

class DropboxService {
  async uploadFile(file, path) {
    try {
      console.log('Attempting to upload file:', file.originalname);
      console.log('Using access token:', process.env.DROPBOX_ACCESS_TOKEN?.slice(0, 5) + '...');

      const response = await dropbox.filesUpload({
        path: `/${path}/${file.originalname}`,
        contents: file.buffer,
        autorename: true
      });
      
      console.log('Upload successful:', response);
      return response;
    } catch (error) {
      console.error('Dropbox upload error details:', {
        message: error.message,
        error: error.error,
        status: error.status
      });
      throw error;
    }
  }
}

module.exports = new DropboxService();