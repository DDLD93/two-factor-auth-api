const Joi = require('joi');
const jsonParser = (req, res, next) => {

    let data = req.body
    console.log("validator middleware>>>>")
    


const register = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),    
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phone: Joi.string().length(14).required(),
    dob: Joi.string().required(),
    email: Joi.string().email()
})
let {error} = register.validate(data)
if (error) {
    return res.status(403).send({ ok: false, message: error.message });

}
    return next();

};
module.exports = jsonParser