import cloudinary from '../cloudinary.js';

export const imageUpload = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'imagePrompts' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(fileBuffer);
    });

    if (result) {
      console.log(result);
      res.status(200).json({ key: result.public_id });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || err });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const resp = await cloudinary.uploader.destroy(req.body.key, {});
    if (resp.result !== 'ok') {
      res.status(500).send('failed to delete image');
    } else {
      res.status(200).send('successfully deleted image');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('failed to delete image');
  }
};
