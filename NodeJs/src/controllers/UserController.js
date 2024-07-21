const database = require("../database/index");
const UserModels = require("../models/UserModels");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const env = require("dotenv");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      user: user,
    },
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: "365d" }
  );
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      user: user,
    },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "30s" }
  );
};
const UserController = {
  checkUser: async (req, res) => {
    try {
      const result = await UserModels.checkUserModels({
        email: req.body.email,
      });
      if (result.length > 0) {
        return res.status(200).json({
          message: "User exists",
          user: result,
        });
      } else {
        return res.status(200).json({
          message: "User does not exist",
          user: result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  sendSMSEmail: async (req, res) => {
    try {
      console.log(req.body);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "chienbinhthephai@gmail.com",
        auth: {
          user: "chienbinhthephai@gmail.com",
          pass: "jtmi koit zkon wpzf",
        },
      });
      let otp = generateOTP();
      const mailOptions = {
        from: "chienbinhthephai@gmail.com",
        to: `${req.body.email}`,
        subject: "Your OTP Code",
        text: `Bạn đang ký tài khoản trên Tiki.Mã OTP của bạn là ${otp}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log("Error sending email: ", error);
        }
        res.cookie("OTP", otp);
        return res.status(200).json({ message: "Email sent successfully" });
      });
    } catch (error) {
      console.log(error);
    }
  },

  createUserAdmin: async (req, res) => {
    try {
      const {
        full_name,
        username,
        birthday,
        email,
        avatar,
        password,
        phone,
        sex,
        verified,
      } = req.body;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      if (hashedPassword) {
        id = uuidv4();
        const result = await UserModels.createUserAdminModels({
          id_user: id,
          full_name,
          username,
          birthday,
          email,
          avatar,
          passwordCode: hashedPassword,
          phone,
          sex,
          verified,
          admin: false,
        });
        if (result) {
          return res
            .status(200)
            .json({ message: "Registration successful", user: result });
        } else {
          return res.status(400).json({ message: "Registration failed" });
        }
      } else {
        return res.status(400).json({ message: "Hassed Password failed" });
      }
    } catch (error) {
      console.log(error);
    }
  },

  register: async (req, res) => {
    try {
      const { email, password, fullname, username } = req.body;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      if (hashedPassword) {
        const id_user = uuidv4();
        const result = await UserModels.registerModels({
          id_user,
          email,
          password: hashedPassword,
          full_name: fullname,
          username: username,
        });
        if (result) {
          return res
            .status(200)
            .json({ message: "Registration successful", user: result });
        } else {
          return res.status(400).json({ message: "Registration failed" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await UserModels.checkUserModels({ email: email });
      console.log(user);
      if (user) {
        const isUser = await bcrypt.compare(password, user[0].passwordCode);
        if (isUser) {
          const accessToken = generateAccessToken(user);
          res.cookie("accessToken", accessToken);
          const refreshToken = generateRefreshToken(user);
          return res.status(200).json({
            message: "Login successful",
            user: user,
            refreshToken: refreshToken,
            accessToken: accessToken,
          });
        } else {
          return res.status(401).json({
            message: "Incorrect password",
            user: null,
          });
        }
      } else
        return res.status(401).json({
          message: "User does not exist",
          user: null,
        });
    } catch (error) {
      console.log(error);
    }
  },

  getUsers: async (req, res) => {
    try {
      const result = await UserModels.getUserModels({
        id_user: req.body.id_user,
      });
      if (result) {
        return res.status(200).json({
          message: "Successfully",
          user: result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await UserModels.deleteUserModels({
        id_user: req.body.id_user,
      });
      if (result) {
        return res.status(200).json({
          message: "User deleted successfully",
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const result = await UserModels.getAllUserModels();
      if (result) {
        return res.status(200).json({
          message: "Successfully",
          user: result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  AdminUploadAvatar: async (req, res) => {
    try {
      console.log(req.body.base64);
      if (req.body.base64) {
        const listBase64 = req.body.base64.filter((item) =>
          item.startsWith("data")
        );
        const result = await cloudinary.uploader.upload(req.body.base64);
        if (result) {
          return res.status(200).json({
            message: "Successfully",
            image: result.url,
          });
        }
      } else {
        return res
          .status(200)
          .json({ message: "Not Avatar Images", image: null });
      }
    } catch (error) {
      console.log(error);
    }
  },

  createUser: async (req, res) => {
    try {
      const user = {
        id_user: uuidv4(),
        full_name: req.body.full_name || null,
        username: req.body.username || null,
        address: req.body.address || null,
        phone: req.body.phone || null,
        countries: req.body.countries || null,
        sex: req.body.sex || null,
        birthday: req.body.birthday || null,
        verified: req.body.verified || null,
        avatar: req.body.avatar || null,
        email: req.body.email || null,
        password: req.body.password || null,
      };
      const result = await UserModels.createUserModels(user);
      if (result) {
        return res.status(200).json({
          result: result,
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const {
        id_user,
        full_name,
        username,
        address,
        countries,
        sex,
        verified,
        avatar,
        phone,
        email,
        birthday,
      } = req.body;
      const result = await UserModels.updateUserModels({
        id_user,
        full_name,
        username,
        address,
        countries,
        sex,
        verified,
        avatar,
        phone,
        email,
        birthday,
      });
      if (result) {
        const user = await UserModels.getUserModels({ id_user: id_user });
        return res.status(200).json({
          message: "Update user successfully",
          user: user,
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getListAddresss: async (req, res) => {
    try {
      const result = await UserModels.getListAddressModels({
        id_user: req.body.id_user,
      });
      if (result) {
        return res.status(200).json({
          message: "GetAddress successfully",
          listAddress: result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  createNewAddress: async (req, res) => {
    try {
      const {
        id_user,
        customer,
        company,
        phone,
        province,
        district,
        ward,
        address,
        type_address,
        default_address,
      } = req.body.address;
      const getIdAddress = await UserModels.getListAddressModels({
        id_user: id_user,
      });
      if (getIdAddress[0]?.address_1 === null) {
        const result1 = await UserModels.createNewAddressModels({
          id_user,
          customer,
          company,
          phone,
          province,
          district,
          ward,
          address,
          type_address,
          id: 1,
        });
        if (default_address) {
          const result2 = await UserModels.setDefaultAddressModels({
            id_user,
            id: 1,
          });
        }
        const user = await UserModels.getUserModels({ id_user });
        if (user) {
          return res.status(200).json({
            message: "Create NewAddress successfully",
            user: user,
          });
        }
      } else if (
        getIdAddress[0]?.address_1 &&
        getIdAddress[0]?.address_2 === null
      ) {
        const result1 = await UserModels.createNewAddressModels({
          id_user,
          customer,
          company,
          phone,
          province,
          district,
          ward,
          address,
          type_address,
          id: 2,
        });
        if (default_address) {
          const result2 = await UserModels.setDefaultAddressModels({
            id_user,
            id: 2,
          });
        }
        const user = await UserModels.getUserModels({ id_user });
        if (user) {
          return res.status(200).json({
            message: "Create NewAddress successfully",
            user: user,
          });
        }
      } else if (getIdAddress[0]?.address_1 && getIdAddress[0]?.address_2) {
        const result = await UserModels.createNewAddressModels({
          id_user,
          customer,
          company,
          phone,
          province,
          district,
          ward,
          address,
          type_address,
          id: 3,
        });
        if (default_address) {
          const result2 = await UserModels.setDefaultAddressModels({
            id_user,
            id: 3,
          });
        }
        const user = await UserModels.getUserModels({ id_user });
        if (user) {
          return res.status(200).json({
            message: "Create NewAddress successfully",
            user: user,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  setDefaultAddress: async (req, res) => {
    try {
      const { id_user, id } = req.body;
      const result = UserModels.setDefaultAddressModels({
        id_user: id_user,
        id: id,
      });
      if (result) {
        const user = await UserModels.getUserModels({ id_user });
        if (user) {
          return res.status(200).json({
            message: "Create NewAddress successfully",
            user: user,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  updatePhone: async (req, res) => {
    try {
      const { id_user, phone } = req.body;
      const result = await UserModels.updatePhoneModels({ id_user, phone });
      if (result) {
        const user = await UserModels.getUserModels({ id_user });
        return res.status(200).json({
          message: "Update phone successfully",
          user: user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { id_user, oldPassword, newPassword, confirmPassword } = req.body;
      console.log(req.body);
      const user = await UserModels.getUserModels({ id_user });
      const isPass = await bcrypt.compare(oldPassword, user.passwordCode);
      console.log(isPass);
      if (!isPass) {
        return res.status(401).json({ message: "Old password is incorrect" });
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const result = await UserModels.updatePasswordModels({
          id_user,
          newPassword: hashedPassword,
        });
        if (result) {
          const user = await UserModels.getUserModels({ id_user: id_user });
          return res.status(200).json({
            message: "Update password successfully",
            user: user,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  updatePasswordByEmail: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      const result = await UserModels.updatePasswordByEmailModels({
        email,
        passwordCode: hashedPassword,
      });
      if (result) {
        const user = await UserModels.getUserModels({ id_user });
        if (user) {
          return res.status(200).json({
            message: "Create NewAddress successfully",
            user: user,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  checkAccessUser: async (req, res) => {
    try {
      const id_user = req.id_user;
      return res.status(200).json({
        message: "User iddAcceessing!!!",
        id_user: id_user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  refreshTokenByUser: async (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;
      const decode_token = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      if (decode_token) {
        const user = await UserModels.checkUserModels({
          email: decode_token.user[0].email,
        });
        if (user) {
          const new_access_token = generateAccessToken(user);
          const new_refresh_token = generateRefreshToken(user);
          return res.cookie("accessToken", new_access_token).status(200).json({
            message: "Refresh token successfully",
            user: user,
            refreshToken: new_refresh_token,
            accessToken: new_access_token,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      const { id_user, avatar } = req.body;
      const avatar_url = await cloudinary.uploader.upload(avatar);
      if (avatar_url) {
        console.log(avatar_url);
        const update = await UserModels.updateUserModels({
          id_user,
          avatar: avatar_url.url,
        });
        if (update) {
          const user = await UserModels.getUserModels({ id_user: id_user });
          return res.status(200).json({
            message: "Update avatar successfully",
            user: user,
          });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  AdminSearchUser: async (req, res) => {
    try {
      const { search } = req.body;
      const result = await UserModels.adminSearchUserModels({ search });
      if (result) {
        return res.status(200).json({
          message: "Search user successfully",
          listUser: result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = UserController;
