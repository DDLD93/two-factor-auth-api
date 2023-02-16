const UserModel = require("../models/user.model");
const RedisCTRL = require("../controllers/redis.controller")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config").app;


class UserController {
    constructor() { }

    async registerUser(data) {
        try {
            let user = await UserModel.findOne({ email: data.email });
            console.log({user})
            if (user) {
                return { ok: false, message: "Account with this email already exist" }
            } else {
                let newData = data
                newData.password = await bcrypt.hash(newData.password, 10)
                const newUser = new UserModel(newData);
                const user = await newUser.save();
                user.password = '*********';
                RedisCTRL.otpSMS(user.phone)
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    phone: user.phone
                }, jwtSecret,{expiresIn:"2h"});
                return { ok: true, user, accessToken:token}
            }
        } catch (error) {
            return { ok: false, message: error.message }
        }
    }
    async verifyUser(phone, code) {
        try {
            const oldCode = await RedisCTRL.read(phone)
            if (oldCode !== code) {
                return { ok: false, message: "Invalid or Expired code" }
            }
            let user = await UserModel.findOneAndUpdate({ phone }, { isVerfied: true }, { multi: false, new: true });
            if (!user) {
                return { ok: false, message: "An Error occured updating record" }
            } else {
                const token = jwt.sign({
                    id: user._id,
                    userType: user.userType,
                }, jwtSecret,{expiresIn:"2h"});
                user.password = '*********';
                return { ok: true, user, token }
            }
        } catch (error) {
            return { ok: false, message: error.message }
        }
    }

    async sendToken(phone, email) {
        try {
            RedisCTRL.otpResendSMS(phone)
            const token = jwt.sign({
                email: email || null,
                phone: phone || null 
            }, jwtSecret,{expiresIn:"2h"});

            return{ok:true, accessToken:token}

        } catch (error) {
            return { ok: false, message: error.message }
        }
    }

    async loginUser(email, password) {
        try {
            let user = await UserModel.findOne({ email});
            if (user) {
                if (!user.isVerfied) {
                    return { ok: false, message: "phone is not verify" }    
                }
                const pCheck =  bcrypt.compareSync(password, user.password)
                if (pCheck) {
                    const token = jwt.sign({
                        id: user._id,
                        userType: user.userType,
                    }, jwtSecret);
                    user.password = '*********';
                    return { ok: true, user, token }
                } else {
                    return { ok: false, message: "invalid email or password" }
                }
            } else {
                return { ok: false, message: "invalid email or password" }
            }
        } catch (error) {
            return { ok: false, message: error.message }
        }
    }

    async getUsers() {
        try {
            const users = await UserModel.find();
            return { ok: true, users };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    }

    async getUser(id) {
        try {
            const user = await UserModel.findById(id);
            return { ok: true, user };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    }


    async addUser(data) {
        try {
            const newUser = new UserModel(data);
            const user = await newUser.save();
            return { ok: true, user };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    }

    async updateUser(id, newData) {
        try {
            const user = await UserModel.findByIdAndUpdate(id, newData, { new: true });
            return { ok: true, user };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    }
    async updatePassword(id, newPassword) {
        try {
            const pCheck = UserModel.comparePassword(newPassword)
            if (pCheck) {
                const user = await UserModel.findByIdAndUpdate(id, { password: newPassword }, { new: false });
                user.password = "*******"
                return { ok: true, user }
            } else {
                return { ok: false, message: "invalid password" }
            }
        } catch (err) {
            return { ok: false, message: err.message };
        }
    }


    async deleteUser(id) {
        try {
            await UserModel.findByIdAndDelete(id);
            return { ok: true, message: "user deleted" };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    }
}



module.exports = new UserController();

