const Categories = require('../models/categories.model');

exports.create = (req,res) => {
    const isBody = Object.keys(req.body).length;

    if(isBody === 0)
    return res.status(200).send({
        errorCode: '004',
        message: 'Failed',
        description: 'Empty fileds',
        data: null
    }); 

    if(isBody === 1)
    return Categories.create(req, (err,data) => {
        if(err) {
            return res.status(200).send({
                errorCode: '005',
                message: 'Failed! New directory categories can not create.',
                data: err
            })
        }

        return res.status(200).send({
            errorCode: '000',
            message: 'Success',
            data: data
        });
    });
}

exports.update = (req,res) => {
    const isBody = Object.keys(req.body).length;

    if(isBody === 0)
    {
        return res.status(200).send({
            errorCode: '004',
            message: 'Failed',
            description: 'Empty fileds',
            data: null
        }); 
    }

    if(req.query.app === 'admin')
    {
        return Categories.update(req, (err,data) => {
            if(err) {
                return res.status(200).send({
                    errorCode: '005',
                    message: 'Update Failed',
                    data: err
                })
            }
    
            return res.status(200).send({
                errorCode: '000',
                message: 'Success',
                data: data
            });
        });
    }

    return res.status(200).send({
        errorCode: '000',
        message: 'Permission Denied',
        data: null
    });

}

exports.delete = (req,res) => {
    if(req.query.app === 'admin') 
    {
        Categories.delete(req.params.id, (err,data) => {
            if(err) {
                return res.status(200).send({
                    errorCode: '005',
                    message: 'Update Failed',
                    data: err
                })
            }
    
            return res.status(200).send({
                errorCode: '000',
                message: 'Success',
                data: data
            });
        });
    }
    else 
    {
        return res.status(200).send({
            errorCode: '004',
            message: 'Permission Denied',
            data: null
        });
    }
}

exports.getAll = (req,res) => {
    Categories.getAll(req,(err,data) => {
        if(err) {
            return res.status(200).send({
                errorCode: '005',
                message: 'Some error occurred while retrieving directory categories',
                data: null
            });
        }

        return res.status(200).send({
            errorCode: '000',
            message: 'Success',
            data: data
        });
    });

};

