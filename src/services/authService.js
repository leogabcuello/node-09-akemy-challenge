const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { findByEmail,
        findById}= require('../services/userService');
const AppError = require('../errors/appError');
const config = require('../config');
const logger = require('../loaders/logger');

const login = async (email, password) => {
    try{
        const user = await findByEmail(email);
        if (!user){
            throw new AppError('Authenticarion falied email / password does not correct', 401);
        }
        if (!user.enable){
            throw new AppError('Authenticarion falied user Disable', 401);
        }
        const validPassword = await bcrypt.compare(password,user.password);
        if (!validPassword){
            throw new AppError('Authenticarion falied email / password does not correct222', 401);
        }

        const token = _emcrypt(user._id);

        return {
            token,
            user: user.name,
            role: user.role
        }
    } catch(err){
        throw err;
    }
}

const validToken = async(token) => {

    try {
        
        // validar que token venga
        if (!token){
            throw new AppError('Authentication failed! Token requeride',401)
        }
        // validar integridad de token
        let id;
        try {
            const obj = jwt.verify(token, config.auth.secret);
            id = obj.id;
        } catch (verifyError) {
            throw new AppError('Authentication failed! invalid token',401) 
        }
        // validar que hay un usuario de ese token
        const user = await findById(id);
        if (!user){
            throw new AppError('Authentication failed! invalid token - user not found',401) 
        }
        if (!user.enable){
            throw new AppError('Authentication failed! User disable',401)
        }
        return user;
    } catch (err) {
        throw err;
    }

}

const validRole = (user, ...roles) => {
    if(!roles.includes(user.role)){
        throw new AppError('Authorization failed User without privileges', 403);
    }
    return true; 
}

_emcrypt = (id) => {
    return jwt.sign({id}, config.auth.secret, { expiresIn: config.auth.ttl  });
}


module.exports = {
    login,
    validToken,
    validRole
}