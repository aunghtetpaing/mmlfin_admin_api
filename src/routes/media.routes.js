module.exports = app => {
    const Media = require('../controllers/media.controller');

    app.post('/upload/image', Media.imageUpload);
}