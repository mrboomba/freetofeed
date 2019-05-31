var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = new mongoose.Schema({

    auth: {
        email: {type:String,
                    unique:true},
        password: String,
        token: String
    },
    available:[{
        date: Date,
        count: {type:Number,
            default:0},
        cost: {type:Number,
            default:0},
        breed: String,
        contract: String,
    }],
    onDuty:[
        {
            Date: Date,
            count: Number,
            cost: Number,
            breed: String,
            contract: String,
        }
    ]

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password,password2) {
    return bcrypt.compareSync(password, password2);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);