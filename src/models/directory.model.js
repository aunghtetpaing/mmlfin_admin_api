const sql = require('../configs/connection.config');

const Directory = (directory) => {
    this.name = directory.name;
    this.phone = directory.phone;
    this.email = directory.email;
    this.website = directory.website;
    this.location = directory.location;
    this.categories = directory.categories;
    this.address = directory.address;
    this.logo = directory.logo;
    this.active = directory.active;
}

Directory.getAll = (req,result) => {

    const numberPerPage = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.skip) || 0;
    const skip = page * numberPerPage;
    const limit = `${skip} , ${numberPerPage}`;
    
    let values = [];
    let wheres = ['categories = ?'];

    values.push(req.params.id);

    if(req.body.filter) {
        const filterArray = [];
        Object.keys(req.body.filter).map((value) => {
            filterArray.push(` AND ${value} = ?`)
        });

        wheres = wheres.concat(filterArray).join('');
        values = values.concat(Object.values(req.body.filter));
    }

    const query = "SELECT * FROM directory_lists WHERE " + wheres + " ORDER BY name DESC LIMIT " + limit;

    if(req.query.app === 'web' || req.query.app === 'admin') {
        return sql.query(query, values, (error,res) => {
            if(error)
            return result(error, null);
            
            if(res)
            return result(null,res);
        });
    }
    
    return result('Page Not Found', null);
}

// Categories.create = (req, result) => {
//     const body = req.body;

//     sql.query("SELECT count(*) as total FROM directory_categories WHERE name= ? ", body.name, (error,res) => {
//         if(error)
//         return result(null, res);
        
//         if(res && req.query.app === 'admin') 
//         {
//             const isExist = res[0].total > 0 ? true : false;
            
//             !isExist ? 
//             sql.query("INSERT INTO directory_categories SET ? ", body, (error, res) => {
//                 if(error)
//                 return result(error, null);
                
//                 if(res)
//                 return result(null, res);
//             }) : 
//             result('exist data', null);
//         } 
//         else 
//         {
//             return result('page not found', null);
//         }
        
//     });
// }

// Categories.update = (req, result) => {

//     sql.query("UPDATE directory_categories SET name = " + `'${req.body.name}'` +" WHERE id=" + `'${req.body.id}'`, (error, res) => {
//         if(error)
//         return result(error, null);
        
//         if(res)
//         {
//             message = res.affectedRows > 0 ? 'Update Success' : 'Id does not found';
//             return result(null, message);
//         }
//     });
// }

// Categories.delete = (categoriesId, result) => {
//     sql.query("DELETE FROM directory_categories WHERE id= ? ", categoriesId, (error, res) => {
//         if(error)
//         return result(error, null);
       
//         if(res) {
//             const message = res.affectedRows > 0 ? 'Deleted' : 'Id does not found';
//             return result(null, message);
//         }
        
//     });
// }

module.exports = Directory;