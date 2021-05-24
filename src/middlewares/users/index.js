const { check } = require('express-validator');
const AppError = require ('../../errors/appError');
const { 
    findByEmail,
    findById 
    } = require('../../services/userService');
const { 
    ROLE,
    ADMIN_ROLE,
    USER_ROLE
    } = require('../../constants'); 
const { validationResult } = require('../commons'); 
const { validJWT, hasRole } = require('../auth'); 

const _nameRequeride = check('name', 'Name Requeride').not().isEmpty();
const _lastNameRequeride = check('lastName', 'LastName Requeride').not().isEmpty();
const _emailRequeride = check('email', 'email Requeride').not().isEmpty();
const _emailValid = check('email', 'email is invalid').isEmail();
const _emailExist = check('email').custom(
    async (email = '') => {
        const userFound = await findByEmail(email);
        if (userFound){
            throw new AppError('Emmail already exist in db', 400);
        }
    }
)
const _passwordRequeride = check('password', 'password is Requeride').not().isEmpty();
const _roleValid = check('role').optional().custom(
    async (role = '') => {
        if (!ROLE.include(role)){
            throw new AppError('Role invalid', 400);
        }
    }
)
const _dateValid = check('birthDate').not().isDate('MM-DD-AAAA');

const _optionalEmailValid = check('email', 'email is invalid').optional().isEmail();
const _optionalEmailExist = check('email').optional().custom(
    async (email = '') => {
        const userFound = await findByEmail(email);
        if (userFound){
            throw new AppError('Emmail already exist in db', 400);
        }
    }
)

const _idRequerid = check('id', 'Id Requeride').not().isEmpty();
const _idIsMongoDB = check('id', 'id is not MongoDB').isMongoId();
const _idExist = check('id').custom(
    async (id = '') => {
        const userFound = await findById(id);
        if (!userFound){
            throw new AppError('Id is not exist in DB', 400);
        }
    }
)

const postReuestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequeride,
    _lastNameRequeride,
    _emailRequeride,
    _emailValid,
    _emailExist,
    _passwordRequeride,
    _roleValid,
    _dateValid,
    validationResult
]

const putRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _roleValid,
    _dateValid,
    _optionalEmailValid,
    _optionalEmailExist,
    _idRequerid,
    _idIsMongoDB,
    _idExist,
    validationResult
]

const deleteRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idExist,
    _idRequerid,
    _idIsMongoDB,
    validationResult
]

const getByIdRequestValidation = [
    validJWT,
    hasRole(USER_ROLE),
    _idExist,
    _idRequerid,
    _idIsMongoDB,
    validationResult
]

const getallRequestValidation = [
    validJWT
]
module.exports = {
    postReuestValidation,
    putRequestValidation,
    deleteRequestValidation,
    getByIdRequestValidation,
    getallRequestValidation
}