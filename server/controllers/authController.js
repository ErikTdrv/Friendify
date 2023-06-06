const router = require('express').Router();
const cloudinary = require('cloudinary');
const { register, login } = require('../services/authService');


router.post('/register', async (req, res) => {
    const data = req.body;
    const { profilePicture } = req.body;
    let profilePhotoId;
    try {
        if (profilePicture) {
            const upload = await cloudinary.v2.uploader.upload(profilePicture, {
                fetch_format: "auto",
                folder: "Friendify",
            });
            data.profilePicture = upload.url;
            data.imageId = upload.public_id;
            profilePhotoId = upload.public_id;
        }
        const user = await register(data);
        res.cookie("auth", user.cookie, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        await cloudinary.v2.uploader.destroy(profilePhotoId)
        res.status(400).json({ error: error.message });
    }
})
router.post('/login', async (req,res) => {
    const data = req.body;
    try {
        const user = await login(data);
        res.cookie("auth", user.cookie, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });
          console.log(user)
          res.status(201).json(user);
        } catch (error) {
          res.status(400).json({ error: error.message });
    }
})

module.exports = router;