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
        res.json({ user, isSuccess: true });
    } catch (error) {
        console.log(error);
        await cloudinary.v2.uploader.destroy(profilePhotoId)
        res.json({ error: error.message, isSuccess: false });

    }
})
router.post('/login', async (req, res) => {
    const data = req.body;
    try {
        const user = await login(data);
        res.cookie("auth", user.cookie, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.json({ user, isSuccess: true });
    } catch (error) {
        res.json({ error: error.message, isSuccess: false });
    }
})

module.exports = router;