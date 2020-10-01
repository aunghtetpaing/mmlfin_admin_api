module.exports = app => {
    const Slider = require('../controllers/slider.controller');

    app.post('/slider', Slider.create);
    app.put('/slider', Slider.update);
    app.get('/slider', Slider.findAll);
    app.delete('/slider/:sliderId', Slider.deleteOne);
    // app.get('/posts/:postId', Post.getOne);
}