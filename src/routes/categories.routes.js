module.exports = app => {
    const Categories = require('../controllers/categories.controller');

    app.get('/categories', Categories.getAll);
    app.post('/categories', Categories.create);
    app.put('/categories', Categories.update);
    app.delete('/categories/:id', Categories.delete);
}