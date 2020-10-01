const fs = require('fs');

const uploading = (res,filePath,base64Image,fileName) => {
    fs.writeFile(filePath, base64Image, { encoding: 'base64'}, (error) => {

        if(error) {
            return res.status(200).send({
                errorCode: '005',
                message: 'Failed',
                data: null
            });
        }

        return res.status(200).send({
            errorCode: '000',
            message: 'Success',
            data: {
                name: fileName,
                path: filePath
            }
        });
    });  
}

exports.imageUpload = (req,res) => {
    const base64Image = req.body.dataUrl.split(';base64,').pop();

    let fileName = '';
    let filePath = 'public/uploads';
    
    if(req.body.article_type) {
        fileName = `mmlfin_${req.body.article_type}_${Date.now()}.png`;
        filePath = `${filePath}/${fileName}`;
        return uploading(res,filePath,base64Image,fileName);
    }
    
    if(req.body.ads_type) {
        fileName = `mmflin_adstype_${req.body.ads_type}_${Date.now()}.png`;
        filePath = `${filePath}/ads/${fileName}`;
        return uploading(res,filePath,base64Image,fileName);
    }
    
    if(req.body.slider) {
        fileName = `mmflin_slider_${Date.now()}.png`;
        filePath = `${filePath}/slider/${fileName}`;
        return uploading(res,filePath,base64Image,fileName);
    }

};