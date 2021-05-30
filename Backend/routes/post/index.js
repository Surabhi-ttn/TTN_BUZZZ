const { Router } = require('express');
var bodyParser=require("body-parser");
const {getpost, getposts, createpost , editpost, deletepost , reportpost, approvereportedpost} = require('../../controllers/post_controller')
const route = Router();

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
	extended: true
}));

route.get('/getpost', (req, res) => {
    let {post_id} = req.query
    getpost(post_id, function (post) {
            if (!post) {
                res.send({
                    "status": 200,
                    "message": "post not found"
                })
            }
            else {
                res.send({
                    "status": 200,
                    "message": "post found",
                    "post": post
                })
            }
        
    })
})

route.get('/getposts', (req, res) => {
    let {user_id} = req.query
    getposts(user_id, function (posts) {
        if (!posts) {
            res.send({
                "status": 200,
                "message": "posts not found"
            })
        }
        else {
            res.send({
                "status": 200,
                "message": "posts found",
                "posts": posts
            })
        }
    })
})

route.post('/createpost', (req, res) => {
    let {user_id, images, caption} = req.body;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!emailRegexp.test(user_id)) {
        res.send({
            "status": 200,
            "message": "user id is wrong"
        })
    }
    createpost({user_id, images, caption}, function (post) {
        res.send({
            "status": 200,
            "message": "post created successfully",
            "post": post
        })
    })
})

route.post('/editpost', (req, res) => {
    let {post_id, images, caption} = req.body;
    editpost({post_id, images, caption}, function (updatedpost){
        res.send({
            "status": 200,
            "message": "post updated successsfully",
            "updatedpost": updatedpost
        })
    })
})

route.post('/deletepost', (req, res) => {
    let {post_id} = req.body;
    deletepost({post_id}, function () {
        res.send({
            "status": 200,
            "message": "post deleted successfully"
        })
    })
})

route.post('/reportpost', (req,res) => {
    let {post_id, status} = req.body;
    reportpost({post_id, status}, function (reportedpost) {
        res.send({
            "status": 200,
            "message": "post reported successfully",
            "reportedpost": reportedpost
        })
    })
})

route.post('/approvereportedpost', (req, res) => {
    let {post_id, status} = req.body;
    approvereportedpost({post_id, status}, function (approvedpost){
        res.send({
            "status": 200,
            "message": "post approved successsfully",
            "approvedpost": approvedpost
        })
    })
})

module.exports = route;