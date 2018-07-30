

module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.delete('/api/profile', logout);
    app.post('/api/login', login);
    app.put('/api/profile', updateProfile);
    var userModel = require('../models/user/user.model.server');


    function login(req, res) {
        var credentials = req.body;
        var code =200;
        if(credentials.username==='admin'&&credentials.password==='admin'){
            code =201;
        }
        userModel
            .findUserByCredentials(credentials)
            .then(function(user) {
                console.log("user in log in " + JSON.stringify(user));
                if(user === null){
                    res.sendStatus(404);
                }
                else{
                    req.session['currentUser'] = user;
                    res.status(code).json(user);
                }



            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }


    function profile(req, res) {
        var user =req.session['currentUser'];

        if(user === undefined){
            res.sendStatus(404);
        }else{
            console.log("user profile " +JSON.stringify(user) );
            res.send(req.session['currentUser']);
        }

    }


    function updateProfile(req, res){
        var user = req.body;
        userModel.updateprofile(user)
            .then(function (user) {
                if(!user){
                    res.sendStatus(404);
                }
                else{

                    req.session['currentUser'] = user;
                    res.send(user);
                    console.log("yes 2"+JSON.stringify(user))
                }

            })
    }


    function createUser(req, res) {
        var user = req.body;
        if(user.username==='admin'){
            if(user.password!=='admin'){
                console.log("not created")
                res.sendStatus(401)
            }
            else{
                userModel
                    .findUserByUserName(user)
                    .then(function (match ) {
                            if (match == null || match.username !== user.username) {
                                userModel.createUser(user)
                                    .then(function (user) {
                                        console.log('create user' + user );
                                        req.session['currentUser'] = user;
                                        res.send(user);
                                    })}
                            else {
                                console.log("not created")
                                res.sendStatus(401)
                            }})}
        }
        else{
            userModel
                .findUserByUserName(user)
                .then(function (match ) {
                        if (match == null || match.username !== user.username) {
                            userModel.createUser(user)
                                .then(function (user) {
                                    console.log('create user' + user );
                                    req.session['currentUser'] = user;
                                    res.send(user);
                                })
                            }
                        else {
                            console.log("not created")
                            res.sendStatus(401)
                        }
                    })}
        }




    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }
}



