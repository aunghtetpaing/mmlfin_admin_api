module.exports = app => {
    const Directory = require('../controllers/directory.controller');

    // app.post('/posts', Post.create);
    // app.put('/posts', Post.update);
    
    // app.get('/posts', Directory.findAll);
    app.get('/directory/:id', Directory.findAll);
}