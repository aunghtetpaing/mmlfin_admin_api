const sql = require('../configs/connection.config');

const Categories = (categories) => {
    this.name = categories.name;
}

Categories.getAll = (req,result) => {
    if(req.query.app === 'web' || req.query.app === 'admin') 
    {
        sql.query('SELECT * FROM directory_categories', (error,res) => {
            if(error)
            return result(error, null);
            
            return result(null,res);
        });
    } 
    else 
    {
        return result('page not found', null);
    }
}

Categories.create = (req, result) => {
    const body = req.body;

    sql.query("SELECT count(*) as total FROM directory_categories WHERE name= ? ", body.name, (error,res) => {
        if(error)
        return result(null, res);
        
        if(res && req.query.app === 'admin') 
        {
            const isExist = res[0].total > 0 ? true : false;
            
            !isExist ? 
            sql.query("INSERT INTO directory_categories SET ? ", body, (error, res) => {
                if(error)
                return result(error, null);
                
                if(res)
                return result(null, res);
            }) : 
            result('exist data', null);
        } 
        else 
        {
            return result('page not found', null);
        }
        
    });
}

Categories.update = (req, result) => {

    sql.query("UPDATE directory_categories SET name = " + `'${req.body.name}'` +" WHERE id=" + `'${req.body.id}'`, (error, res) => {
        if(error)
        return result(error, null);
        
        if(res)
        {
            message = res.affectedRows > 0 ? 'Update Success' : 'Id does not found';
            return result(null, message);
        }
    });
}

Categories.delete = (categoriesId, result) => {
    sql.query("DELETE FROM directory_categories WHERE id= ? ", categoriesId, (error, res) => {
        if(error)
        return result(error, null);
       
        if(res) {
            const message = res.affectedRows > 0 ? 'Deleted' : 'Id does not found';
            return result(null, message);
        }
        
    });
}

module.exports = Categories;