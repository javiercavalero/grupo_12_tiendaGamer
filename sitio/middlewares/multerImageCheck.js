const path = require ('path');
const multer = require ('multer');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/users'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, 'img-profile-' + Date.now() + path.extname(file.originalname));  } 
  })

  const upload = multer({ storage });

  module.exports = upload;