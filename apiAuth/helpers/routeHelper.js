const Joi = require('@hapi/joi');

module.exports = {
    validateBody : (schema)=>{
        return (req, res , next)=>{
            const result = schema.validate(req.body);
            console.log(result);
            if(result.error){
                return res.status(400).json(result.error);
            }
            else{
                if(!req.value) req.value = {};
                req.value['body'] = result.value;
                next();
            }
        }
    },

    schemas : {
        authSchema : Joi.object({
            email : Joi.string().email().required(),
            password : Joi.string().required()
        })
    }

}