const sql = require('../configs/connection.config');

const Post = (post) => {
    this.title = post.title;
    this.photo = post.photo;
    this.description = post.description;
    this.body = post.body;
    this.article_type = post.article_type;
    this.article_language = post.article_language;
    this.post_date = post.post_date;
    this.active = post.active;
}

Post.getAll =  (req, result) => {
    const numberPerPage = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.skip) || 0;
    const skip = page * numberPerPage;
    const limit = `${skip} , ${numberPerPage}`;
    const lang = req.query.lang || 'English';
    
    let columns = ['id', 'photo', 'title', 'photo', 'description', 'article_type', 'article_language', 'post_date', 'active'];
    let wheres = ['article_language'];
    let totalCount = 0;
    let query = 'SELECT ?? FROM ?? WHERE ?? = ? ORDER BY id DESC';

    sql.query("SELECT count(*) as total FROM articles", (error,res) => {
        if(error)
        totalCount = 0;
        
        totalCount = res[0].total;
    });
    
    if(req.query.app ==='admin'){
        const newColumns = [];
        
        columns.filter((value) => {
            if(value !== 'photo') newColumns.push(value);  
        });
        
        columns = newColumns;
    }
    
    if(req.query.app === 'web') {
        query = 'SELECT ?? FROM ?? WHERE ?? = ? ORDER BY id DESC LIMIT ' + limit;
    }
    
    sql.query(query, [columns, 'articles', wheres, lang], (error,res) => {
        if(error)
        return result(error, null);
        
        return result(null,{
            total: totalCount,
            list: res,
        });
    });
}

Post.getOne =  (postId, result) => {
    sql.query("SELECT * FROM articles WHERE id=" + `'${postId}'`, (error,res) => {
        if(error)
        return result(error, null);
        
        if(res.length)
        return result(null,res[0]);
        
        return result({ message: 'Post Not Found'}, null);
    });
}

Post.createPost = (req, result) => {
    let body = req.body;
    body.active = 1;

    return sql.query("INSERT INTO articles SET ? ", body, (error, res) => {
        if(error)
        return result(error, null);
        
        return result(null, res);
    })
}

Post.update = (req, result) => {
    let body = req.body;

    return sql.query("UPDATE articles SET title= ?, photo=?, description=?, body=?, article_type=?, article_language=?, post_date=?, active=? WHERE id=? ", 
    [body.title, body.photo, body.description, body.body, body.article_type, body.article_language, body.post_date, body.active, body.id], (error, res) => {
        if(error)
        return result(error, null);
        
        return result(null, res);
    });
}

module.exports = Post;