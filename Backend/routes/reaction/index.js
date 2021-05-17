const { Router } = require('express');
var bodyParser=require("body-parser");
const {like, dislike, comment, getcomment} = require('../../controllers/reaction_controller')
const route = Router();

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
	extended: true
}));

route.post('/like', (req, res) => {
	let {post_id, user_id} = req.body;
	like(post_id, user_id, function (data) {
		res.send({
			"status": 200,
			"message": "one like posted successfully",
			"data": data
		})
	})
})

route.post('/dislike', (req, res) => {
	let {post_id, user_id} = req.body;
	dislike(post_id, user_id, function (data) {
		res.send({
			"status": 200,
			"message": "one dislike posted successfully",
			"data": data
		})
	})
})

route.post('/comment', (req, res) => {
	let {post_id, user_id, comment_description} = req.body;
	comment({post_id, user_id, comment_description}, function (data) {
		res.send({
			"status": 200,
			"message": "one comment posted successfully",
			"data": data
		})
	})
})

route.get('/getcomment', (req, res) => {
	let {reaction_id} = req.query
    getcomment(reaction_id, function (comment) {
            if (!comment) {
                res.send({
                    "status": 200,
                    "message": "comment not found"
                })
            }
            else {
                res.send({
                    "status": 200,
                    "message": "comment found",
                    "comment": comment
                })
            }
        
    })
})

module.exports = route;