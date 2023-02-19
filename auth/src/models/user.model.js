const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String },
    email: { type: String, index: { unique: true, } },
    phone: { type: String, index: { unique:true } },
    password: { type: String },
    dob:{type: Date},
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