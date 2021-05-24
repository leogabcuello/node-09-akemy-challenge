const express = require('express');
//const logger = require('../loaders/logger');
const { 
    findAll,
    findById,
    save,
    update,
    remove 
} = require('../services/userService');    
const Success = require('../handlers/successHandler');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */ 

const getAllUser = async (req, res, next) => {
    
    try {
        const users = await findAll(req.query.filter, req.query.options);
        res.json(new Success(users));
    } catch(err){
        next(err);
    }    
};
    
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
*/

const getById = async (req, res, next) => {
    
    try {
        const { id } = req.params;
        
        const user = await findById(id);
    
        res.json(new Success(user));
    } catch(err) {
        next(err);
    }
};    

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */ 
const createUser = async (req, res, next) => {
    
    try{
        let user = req.body;
    
        user = await save(user);
    
        const result = {
            message: 'user create',
            user
        }    
        res.status(201).json(new Success(result));
    } catch(err){
        next(err);
    }    
};    

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */ 
const updateUser = async (req, res, next) => {
    
    try {
        const { id } = req.params;
        const user = req.body;

        await update(id,user);
    
        const result = {
            message: 'user update',
            user
        }    
        res.json(new Success(result));
    } catch(err){
      next(err);  
    }  
};    

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteUser = async(req, res, next) => {
    
    try {
        const { id } = req.params;
    
        const user = await remove(id);
    
        const result = {
            message: `user with id: ${id} deleted`,
            user
        }
        res.json(new Success(result));
    } catch(err){
       next(err);
    }
};

module.exports = {
    getAllUser,
    createUser,
    deleteUser,
    updateUser,
    getById    
}