const Ads = require('../models/ads.model');

// exports.create = (req,res) => {
//     Post.createPost(req, (err,data) => {
//         if(err) {
//             return res.status(200).send({
//                 errorCode: '005',
//                 message: 'Failed! New post can not create.',
//                 data: err
//             })
//         }

//         return res.status(200).send({
//             errorCode: '000',
//             message: 'Success',
//             data: data
//         });
//     });
// }

exports.update = (req,res) => {
    Ads.update(req, (err,data) => {
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
    Ads.getAll(req, (err,data) => {
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

// exports.getOne = (req,res) => {
//     Post.getOne(req.params.postId, (err,data) => {
//         if(err) {
//             return res.status(200).send({
//                 errorCode: '005',
//                 message: err,
//                 data: null
//             });
//         }

//         return res.status(200).send({
//             errorCode: '000',
//             message: 'Success',
//             data: data
//         });
//     });
// };

