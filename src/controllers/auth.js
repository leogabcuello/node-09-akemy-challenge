const express = require('express');
//const logger = require('../loaders/logger');
const authService= require('../services/authService');    
const Success = require('../handlers/successHandler');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */ 

const login = async (req, res, next) => {
    
    const {email, password} = req.body;
    try {
        res.json(new Success(await authService.login(email, password)));
    } catch(err){
        next(err);
    }    
};
    
module.exports = {
    login
}