const { UploadStream } = require("cloudinary");

require("dotenv").config()
const cloudinary = require('cloudinary').v2;



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




app.post("/upload", upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "somefolder" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })

      uploadStream.end(fileBuffer);
    })


  res.status(200).json({
    public_id: result.public_id,
  })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({result})
  }
})

