const sql = require('../configs/connection.config');

const Ads = (ads) => {
    this.photo = ads.photo;
    this.type = ads.type;
    this.link = ads.link;
    this.count = ads.count;
    this.active = ads.active;
}

Ads.getAll =  (req, result) => {
    sql.query('SELECT * FROM ads ORDER BY id DESC', (error,res) => {
        if(error) {
            return result(error, null);
        }
        
        return result(null, res);
    });
}

// Post.getOne =  (postId, result) => {
//     sql.query("SELECT * FROM articles WHERE id=" + `'${postId}'`, (error,res) => {
//         if(error) {
//             return result(error, null);
//         }

//         if(res.length) {
//             return result(null,res[0]);
//         }

//         return result({ message: 'Post Not Found'}, null);
//     });
// }

// Post.createPost = (req, result) => {
//     let body = req.body;
//     body.active = 1;

//     return sql.query("INSERT INTO articles SET ? ", body, (error, res) => {
//         if(error) {
//             return result(error, null);
//         }

//         return result(null, res);
//     })
// }

Ads.update = (req, result) => {
    let body = req.body;

    return sql.query("UPDATE ads SET photo= ?, type=?, link=?, count=?, active=? WHERE id=? ", 
    [body.photo, body.ads_type, body.link, body.count, body.active, body.id], (error, res) => {
        if(error) {
            return result(error, null);
        }

        return result(null, res);
    })
}


module.exports = Ads;