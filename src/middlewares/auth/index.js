const { check } = require('express-validator');
const AppError = require ('../../errors/appError');
const { validationResult } = require('../commons'); 
const { 
        validToken, 
        validRole 
        } = require('../../services/authService');

 
const _emailRequeride = check('email', 'email Requeride').not().isEmpty();
const _emailValid = check('email', 'email is invalid').isEmail();
const _passwordRequeride = check('password', 'password is Requeride').not().isEmpty();

const postLoginReuestValidation = [
    _emailRequeride,
    _emailValid,
    _passwordRequeride,
    validationResult
]

const validJWT = async (req, res, next ) => {
    try {
        const token = req.header('Authorization');
        const user = await validToken(token);
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

const hasRole = (...roles) => {
    
    return (req, res, next) => {
        try {
            validRole(req.user, ...roles);
            next();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    postLoginReuestValidation,
    validJWT,
    hasRole
}