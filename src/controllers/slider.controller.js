const Slider = require('../models/slider.model');

exports.create = (req,res) => {
    Slider.create(req, (err,data) => {
        if(err) {
            return res.status(200).send({
                errorCode: '005',
                message: 'Failed! New slider can not create.',
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
    Slider.update(req, (err,data) => {
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

exports.findAll = (req,res) => {
    Slider.getAll(req, (err,data) => {
        if(err) {
            return res.status(200).send({
                errorCode: '005',
                message: 'Some error occurred while data retrieving',
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

exports.deleteOne = (req,res) => {
    Slider.deleteOne(req.params.sliderId, (err, data) => {
        if(err) {
            return res.status(200).send({
                errorCode: '005',
                message: 'Deleted Failed',
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


