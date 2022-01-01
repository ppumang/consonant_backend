const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk")
const credential = require("../consonant_aws_credentials.json");

const s3 = new AWS.S3({ ...credential, region: 'ap-northeast-1' });
// 기타 express 코드
const storage = multerS3({
    s3: s3,
    bucket: 'consonantmedia',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
        console.log({ file })
        cb(null, `media/${file.originalname}_${Date.now()}`)
    },
})
exports.mediaUpload = multer({ storage });