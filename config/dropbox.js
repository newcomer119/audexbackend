require('dotenv').config();
const { Dropbox } = require('dropbox');

if (!process.env.DROPBOX_ACCESS_TOKEN) {
  throw new Error('DROPBOX_ACCESS_TOKEN is required in .env file');
}

const dropbox = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch: fetch // Required for Node.js environment
});

module.exports = dropbox;