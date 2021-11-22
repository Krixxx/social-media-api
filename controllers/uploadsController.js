const { StatusCodes } = require('http-status-codes');

// set up cloudinary
const cloudinary = require('cloudinary').v2;

// set up fileystem
const fs = require('fs');

const uploadUserImage = async (req, res) => {
  // get image from temp folder and upload to cloudinary
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: 'social-media-project' }
  );

  // delete file from temporary folder
  fs.unlinkSync(req.files.image.tempFilePath);

  // return image url in image object
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = { uploadUserImage };
