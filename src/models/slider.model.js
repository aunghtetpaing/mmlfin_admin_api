const sql = require('../configs/connection.config');

const Slider = (slider) => {
    this.name = slider.name;
    this.active = slider.active;
}

Slider.getAll =  (req, result) => {
    sql.query('SELECT * FROM slider ORDER BY id DESC', (error,res) => {
        if(error) {
            return result(error, null);
        }
        
        return result(null, res);
    });
}

Slider.deleteOne = (sliderId,result) => {
    sql.query('DELETE FROM slider WHERE id=?', sliderId, (error,res) => {
        if(error) {
            return result(error, null);
        }
        
        return result(null, res);
    });
};

Slider.create = (req, result) => {
    const body = {};
    body.name = req.body.photo;
    body.active = 1;
    
    return sql.query("INSERT INTO slider SET ? ", body, (error, res) => {
        if(error) {
            return result(error, null);
        }

        return result(null, res);
    })
};


Slider.update = (req, result) => {
    let body = req.body;

    return sql.query("UPDATE slider SET name= ?, active=? WHERE id=? ", 
    [body.name, body.active, body.id], (error, res) => {
        if(error) {
            return result(error, null);
        }

        return result(null, res);
    })
}


module.exports = Slider;