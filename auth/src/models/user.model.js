const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String },
    email: { type: String, index: { unique: true, } },
<<<<<<< HEAD
    phone: { type: String, index: { unique:true } },
    dob:{type:Date},
=======
    phone: { type: String, index: { unique: true } },
>>>>>>> 0ead2b26fb4554c21d33abb92bdffa1b389a4954
    password: { type: String },
    dob: { type: String },
    userType: { type: String, enum: ["Regular", "Admin"], default: "Regular" },
    status: { type: String, enum: ["Active", "Suspended"], default: "Active" },
    isVerfied: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now() },
    createdAt: { type: Date, default: Date.now() },
});
// UserSchema.pre("save", function (next) {
//     this.fullName = this.lastName + " " + this.firstName
//     next()
// })

module.exports = mongoose.model("User", UserSchema);