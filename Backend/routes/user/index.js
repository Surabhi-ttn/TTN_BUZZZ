const { Router } = require('express');
var bodyParser=require("body-parser");
const { showprofile, editprofile, sendfriendrequest, acceptrequest, deleterequest, getpendingrequest, contactlist, suggestionlist} = require('../../controllers/user_controller');
const route = Router();

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
	extended: true
}));

route.get('/showprofile', (req, res) => {
    let {user_id} = req.query
    showprofile(user_id, function (profile) {
            if (!profile) {
                res.send({
                    "status": 200,
                    "message": "profile not found"
                })
            }
            else {
                res.send({
                    "status": 200,
                    "message": "profile found",
                    "first_name": profile.first_name,
                    "last_name": profile.last_name,
                    "profile_pic": profile.profile_pic,
                    "designation": profile.designation,
                    "city": profile.city,
                    "state": profile.state,
                    "website": profile.website,
                    "cover_pic": profile.cover_pic,
                    "friend_count": profile.friends
                })
            }
        
    })
})

route.post('/editprofile', (req, res) => {
    editprofile(req.body, function (data) {
        res.send({
            "status": 200,
            "message": "Profile updated succesfully",
            "data": data
        })
    })
})

route.post('/sendfriendrequest', (req, res) => {
    let {user_id, friend_id} = req.body
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!emailRegexp.test(user_id) || !emailRegexp.test(friend_id)) {
        res.send({
            "status": 200,
            "message": "user id is wrong"
        })
    }
    sendfriendrequest(friend_id, user_id, function (data) {
        res.send({
            "status": 200,
            "message": "friend request send",
            "data": data
        })
    })
})

route.post('/acceptrequest', (req, res) => {
    let {user_id, friend_id} = req.body
    acceptrequest(user_id,friend_id, function(data) {
        res.send({
            "status": 200,
            "message": "friend request accepted",
            "data": data
        })
    })
})

route.post('/deleterequest', (req, res) => {
    let {user_id, friend_id} = req.body
    deleterequest(user_id,friend_id, function(data) {
        res.send({
            "status": 200,
            "message": "friend request deleted",
            "data": data
        })
    })
})

route.get('/getpendingrequest', (req, res) => {
    let user_id  = req.query.user_id    
    getpendingrequest(user_id, function (users) {
        res.send({
            "status": 200,
            "message": "get pending request successfully",
            "Pending friend request": users
        });
    });
})

route.get('/contactlist', (req, res) => {
    let user_id  = req.query.user_id    
    contactlist(user_id, function (users) {
        res.send({
            "status": 200,
            "message": "get contactlist successfully",
            "suggestionlist": users
        });
    });
});

route.get('/suggestionlist', (req, res) => {
    let user_id  = req.query.user_id    
    suggestionlist(user_id, function (users) {
        res.send({
            "status": 200,
            "message": "get suggestionlist successfully",
            "suggestionlist": users
        });
    });
});

module.exports = route;