// import {Schema,model} from 'mongoose';
const mongoose = require('mongoose');

const MarioCharSchema = new mongoose.Schema({
    name : String,
    weight : Number
})

const MarioChar = mongoose.model('mariochar', MarioCharSchema);

module.exports = MarioChar;
