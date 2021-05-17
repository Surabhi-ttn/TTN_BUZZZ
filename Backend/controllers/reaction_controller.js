const { reactionModel, postModel } = require("../Model");

function like(post_id, user_id, cb) {
  reactionModel.create(
    {
      post_id: post_id,
      user_id: user_id,
      reaction_type: "like",
    },
    function (err, data) {
      if (err) throw err;
      postModel.findOneAndUpdate(
        { _id: post_id },
        { $inc: { like_count: 1 } },
        function (err, data) {
          if (err) throw err;
          else {
            cb(data);
          }
        }
      );
    }
  );
}

function dislike(post_id, user_id, cb) {
  reactionModel.create(
    {
      post_id: post_id,
      user_id: user_id,
      reaction_type: "dislike",
    },
    function (err, data) {
      if (err) throw err;
      postModel.findOneAndUpdate(
        { _id: post_id },
        { $inc: { dislike_count: 1 } },
        function (err, data) {
          if (err) throw err;
          else {
            cb(data);
          }
        }
      );
    }
  );
}

function comment(commentdata, cb) {
  reactionModel.create(
    {
      post_id: commentdata.post_id,
      user_id: commentdata.user_id,
      comment_description: commentdata.comment_description,
      reaction_type: "comment",
    },
    function (err, data) {
      if (err) throw err;
      postModel.findOneAndUpdate(
        { _id: commentdata.post_id },
        { $inc: { comment_count: 1 } },
        function (err, data) {
          if (err) throw err;
          else {
            cb(data);
          }
        }
      );
    }
  );
}

function getcomment(reaction_id, cb) {
  reactionModel.findOne({ _id: reaction_id }, function (err, data) {
    if (data) {
      cb(data);
    } else {
      cb(null);
    }
  });
}

module.exports = { like, dislike, comment, getcomment };
