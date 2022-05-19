const router = require("express").Router();
const path = require("path");
const fs = require('fs')
const userModel = require("../models/userModel");
const { checkLogin, checkUser } = require("../middleWare/checkForm");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

//* Login & Register
router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (user) {
      const compare = await bcrypt.compare(req.body.password, user.password);
      if (compare) {
        const token = jwt.sign({ id: user._id }, "1234");
        await userModel.updateOne(
          { _id: user._id },
          {
            token: token,
          }
        );
        res.cookie("user", token, {
          expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
        });
        res.status(200).json({ message: "Thành công" });
      } else {
        res
          .status(400)
          .json({ message: "Email hoặc mật khẩu không chính xác" });
      }
    } else {
      res.status(400).json({ message: "Email hoặc mật khẩu không chính xác" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      const hash = await bcrypt.hash(req.body.password, 10);
      userModel.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hash,
        date: req.body.date,
        gender: req.body.gender,
        avatar:
          req.body.gender === "Nam"
            ? "/public/img/avatar-default-male.jpg"
            : "/public/img/avatar-default-female.jpg",
      });
      res.status(200).json({ message: "Successfull" });
    } else {
      res.status(400).json({
        message: "Email này đã tồn tại. Vui lòng thay đổi Email khác !",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed" });
  }
});

router.put("/logout", async (req, res) => {
  try {
    let token = req.cookies.user;
    await userModel.updateOne(
      { token: token },
      {
        token: "",
      }
    );
    res.status(200).json({ message: "Successfull Logout" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server" });
  }
});

//* Profile
router.get("/:id", checkLogin, async (req, res) => {
  const username = await userModel.findOne({
    _id: req.params.id,
  });
  res.render("profile/post", {
    user: req.user,
    username,
  });
});

router.get("/:id/about", checkLogin, async (req, res) => {
  const username = await userModel.findOne({
    _id: req.params.id,
  });
  res.render("profile/intro", {
    user: req.user,
    username,
  });
});

router.get("/:id/change-password", checkLogin, async (req, res) => {
  const username = await userModel.findOne({
    _id: req.params.id,
  });
  res.render("profile/changePassword", {
    user: req.user,
    username,
  });
});

// * Change Information
router.post("/intro", async (req, res) => {
  let token = req.cookies.user;
  try {
    const user = await userModel.findOne({
      token: token,
    });
    if (user) {
      await userModel.updateOne(
        {
          token: token,
        },
        {
          profile: {
            address: req.body.address,
            position: req.body.position,
            education: req.body.education,
            working: req.body.working,
          },
        }
      );
      res.status(200).json({ message: "Thành công" });
    } else {
      res.status(400).json({ message: "Edit Failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error Server" });
  }
});

router.delete("/delete", async (req, res) => {
  let token = req.cookies.user;
  try {
    const user = await userModel.findOne({
      token: token,
    });
    if (user) {
      await userModel.updateOne(
        {
          token: token,
        },
        {
          profile: {
            address: "",
            position: "",
            education: "",
            working: "",
          },
        }
      );
      res.status(200).json({ message: "Sucessfull" });
    } else {
      res.status(400).json({ message: "Invalid Username " });
    }
  } catch (error) {
    res.status(500).json({ message: "Error Server" });
  }
});

//* Upload Image
router.put("/profile/avatar", upload.single("avatar"), async (req, res) => {
  let token = req.cookies.user;
  try {
    const user = await userModel.findOne({
      token: token,
    });
    if (user) {
      fs.unlink(path.join(__dirname, '../' + user.avatar) ,(err) => {
        if (err) {
          console.log(err);
        }
      } )
      if (req.file) {
        await userModel.updateOne(
          {
            token: token,
          },
          {
            avatar: "/" + req.file.path,
          }
        );
        res.status(200).json({ message: "Upload thành công" });
      } else {
        res.status(400).json({ message: "Upload thất bại" });
      }
    } else {
      res.status(400).json({ message: "Upload thất bại" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/profile/cover", upload.single("coverImg"), async (req, res) => {
  let token = req.cookies.user;
  try {
    const user = await userModel.findOne({
      token: token,
    });
    if (user) {
      if (req.file) {
        fs.unlink(path.join(__dirname, '../' + user.coverImg) ,(err) => {
          if (err) {
            console.log(err);
          }
        })
        await userModel.updateOne(
          {
            token: token,
          },
          {
            coverImg: "/" + req.file.path,
          }
        );
        res.status(200).json({ message: "Upload thành công" });
      } else {
        res.status(400).json({ message: "Upload thất bại" });
      }
    } else {
      res.status(400).json({ message: "Upload thất bại" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// * Change Password
router.put("/change-password", async (req, res) => {
  let token = req.cookies.user;
  try {
    const user = await userModel.findOne({
      token: token,
    });
    if (user) {
      const compare = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (compare) {
        const hash = await bcrypt.hash(req.body.confirmPassword, 10);
        await userModel.updateOne(
          {
            token: token,
          },
          {
            password: hash,
          }
        );
        res.status(200).json({ message: "Sucessfull" });
      } else {
        res.status(400).json({ message: "Mật khẩu hiện tại không chính xác" });
      }
    } else {
      res.status(400).json({ message: "Unsaved" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
