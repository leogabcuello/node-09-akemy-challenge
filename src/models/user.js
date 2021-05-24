const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    lastName:{
        type: String,
        required: [true, 'Last Name required']
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        index: true
    },
    birthDate:   Date,
    password: {
        type: String,
        required: [true, 'Password required']
    },
    role: {
        type: String,
        required: [true, 'Role required'],
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    enable: {
        type: Boolean,
        required: true,
        default: true
    }
},
    {timestamps: true}
);  

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', userSchema);