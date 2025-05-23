const cloudinary = require("./cloudinary.js");


const imageUpload = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "imagePrompts" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })

      uploadStream.end(fileBuffer);
    })

    if (result) {
      console.log(result)
      res.status(200).json({
        key: result.public_id,
      })
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err })
  }
}


const deleteImage = async (req, res) => {
  cloudinary.uploader.destroy(req.body.key, {}).then((resp) => {
    if (resp.result != "ok") res.status(500).send("failed to delete image");
    else res.status(200).send("successfully deleted image")
  });
}
