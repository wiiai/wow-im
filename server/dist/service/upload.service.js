"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadService = exports.uploadFromFilePath = void 0;
const qiniu = require('qiniu');
const publicUrl = 'http://s3.airtlab.com';
const bucket = 'resource-s3';
const AccessKey = 'Xu-zACyarx7mv9HMRmUOOM20BllQtYMe-XWJek27';
const SecretKey = 'rnWKup5uNSnxrdRK8SmPx75sZNQN9pFUAIt23ijs';
const mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
const options = { scope: bucket };
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;
function uploadFromFilePath(localFile, fileName) {
    return new Promise((resolve, reject) => {
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        console.log('start upload');
        // 文件上传
        formUploader.putFile(uploadToken, Date.now() + '_' + fileName, localFile, putExtra, function (respErr, respBody, respInfo) {
            console.log('upload end', respErr, respInfo);
            if (respErr) {
                reject(respErr);
            }
            else {
                if (respInfo.statusCode == 200) {
                    resolve(Object.assign(Object.assign({}, respBody), { url: publicUrl + '/' + respBody.key }));
                }
            }
        });
    });
}
exports.uploadFromFilePath = uploadFromFilePath;
const uploadService = {
    upload() {
    }
};
exports.uploadService = uploadService;
