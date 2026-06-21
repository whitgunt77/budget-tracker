const Joi = require('joi');

const transactionSchema = Joi.object({
    category: Joi.string().min(1).required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().iso().default(Date.now)
});

const validateTransaction = (req, res, next) => {
    const { error } = transactionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateTransaction;