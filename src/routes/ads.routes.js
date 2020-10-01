module.exports = app => {
    const Ads = require('../controllers/ads.controller');

    // app.post('/posts', Post.create);
    app.put('/ads', Ads.update);
    app.get('/ads', Ads.findAll);
    // app.get('/posts/:postId', Post.getOne);
}