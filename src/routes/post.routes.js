module.exports = app => {
    const Post = require('../controllers/post.controller');

    app.post('/posts', Post.create);
    app.put('/posts', Post.update);
    
    app.get('/posts', Post.findAll);
    app.get('/posts/:postId', Post.getOne);
}