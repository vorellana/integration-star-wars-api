const Joi = require('joi')

const personajeSchema = Joi.object({
    nombre: Joi.string().required()
}).pattern(Joi.string(), [Joi.any().optional()])

module.exports = {
    validatePersonaje: (data) => personajeSchema.validate(data)
}
