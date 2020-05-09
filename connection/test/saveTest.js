// import {MarioChar} from '../models/mariochar';
const MarioChar = require('../models/mariochar')
const assert = require('assert');
//create tests


describe('some test', ()=> {
    it('save test', ()=>{
        let char = new MarioChar({name : 'Rajender', age : 45});
        char.save().then((done)=>{
            assert(char.isNew === false);
            done();
        })
    })
})