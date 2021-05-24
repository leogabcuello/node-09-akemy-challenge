const { Router } = require('express');
const { 
    getAllUser,
    createUser,
    deleteUser,
    updateUser,
    getById                
} = require('../controllers/users');
const { 
    postReuestValidation,
    putRequestValidation,
    deleteRequestValidation,
    getByIdRequestValidation,
    getallRequestValidation
 } = require('../middlewares/users');
 
const router = Router();

router.get('/', getallRequestValidation, getAllUser);
router.post('/', postReuestValidation, createUser); 
router.put('/:id', putRequestValidation,updateUser);
router.get('/:id', getByIdRequestValidation, getById);
router.delete('/:id',deleteRequestValidation, deleteUser);

module.exports = router;