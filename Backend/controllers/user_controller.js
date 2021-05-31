const { userModel } = require("../Model");

function showprofile(user_id, cb) {
  userModel.findOne({ user_id: user_id }, function (err, data) {
    if (data) {
      cb(data);
    } else {
      cb(null);
    }
  });
}

function editprofile(updateprofilefields, cb) {
  userModel.findOneAndUpdate(
    { user_id: updateprofilefields.user_id },
    updateprofilefields,
    function (err, data) {
      if (err) throw err;
      userModel.find({ user_id: updateprofilefields.user_id }, function (err, profile) {
        if (err) throw err;
        cb(profile);
      });
    }
  );
}

function sendfriendrequest(user_id, friend_id, cb) {
  userModel.findOne({ user_id: user_id }, function (err, data) {
    if (err) throw err;
    let newreqarray = data.friend_request;
    newreqarray.push(friend_id);
    userModel.updateOne(
      { user_id: user_id },
      { friend_request: newreqarray },
      function (err, data) {
        if (data) {
          cb(data);
        } else {
          throw err;
        }
      }
    );
  });
}

async function deleterequest(user_id, friend_id, cb) {
  let user = await userModel.findOne({ user_id: user_id });
  let pendingrequestlist = user.friend_request;
  let updatedrequestlist = pendingrequestlist.filter(
    (pendingfriend) => pendingfriend != friend_id
  );
  userModel.findOneAndUpdate(
    { user_id: user_id },
    {
      friend_request: updatedrequestlist,
    },
    function (err, data) {
      if (err) throw err;
      else {
        cb(data);
      }
    }
  );
}

async function acceptrequest(user_id, friend_id, cb) {
  userModel.findOne({ user_id: user_id }, function (err, data) {
    if (err) throw err;
    let newfriendarray = data.friends;
    newfriendarray.push(friend_id);
    userModel.updateOne(
      { user_id: user_id },
      { friends: newfriendarray },
      function (err, data) {
        if (data) {
          userModel.findOne({ user_id: friend_id }, function (err, data) {
            if (err) throw err;
            let newfriendarray = data.friends;
            newfriendarray.push(user_id);
            userModel.updateOne(
              { user_id: friend_id },
              { friends: newfriendarray },
              function (err, data) {
                if (data) {
                  deleterequest(user_id, friend_id, cb);
                } else {
                  throw err;
                }
              }
            );
          });
        } else {
          throw err;
        }
      }
    );
  });
}

async function getpendingrequest(user_id, cb) {
  console.log(user_id)
  let result = []
  let user = await userModel.findOne({ user_id: user_id })
  let pendingrequestlist = await userModel.find()
  result = pendingrequestlist.filter(pendingrequest => user.friend_request.includes(pendingrequest.user_id))
  cb(result);
}

async function contactlist(user_id, cb) {
  let result = [];
  let user = await userModel.findOne({"user_id": user_id})
  let allusers = await userModel.find()
  result = allusers.filter(contactuser => user.friends.includes(contactuser.user_id))
  cb(result);
}

async function suggestionlist(user_id, cb) {
  let user = await userModel.findOne({ user_id: user_id });
  let friend_list = user.friends;
  userModel.find({}, function (err, data) {
    if (data) {
      data = data.filter(
        (newuser) =>
          !friend_list.includes(newuser.user_id) && newuser.user_id != user_id
      );
      cb(data);
    } else {
      cb(null);
    }
  });
}

module.exports = {
  showprofile,
  editprofile,
  sendfriendrequest,
  acceptrequest,
  deleterequest,
  getpendingrequest,
  contactlist,
  suggestionlist,
};
