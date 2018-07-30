var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials,
        {username: 1,
            firstName:1,
            lastName:1,
            email:1,
            phoneNumber:1,
            address:1,
    });
}

function findUserByUserName(user){
    return userModel.findOne({username:user.username});
}
function updateprofile(user){
    console.log("inside user " +JSON.stringify(user));

    var userId=user._id

    return userModel
    .findOneAndUpdate(
    {_id:userId},
        {
            $set: {

                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber:user.phoneNumber,
                address:user.address

            }
        },
        {upsert:true,
         returnNewDocument:true},

     function(err,data){
          if(err){
              console.log("err")
          }
          else{
              console.log("body" + data)
              return data;
          }
     }
)
;


}


function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    console.log("create user inside " +user )
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    findUserByUserName: findUserByUserName,
    updateprofile:updateprofile,
};

module.exports = api;