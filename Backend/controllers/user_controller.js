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
          console.log(data);
          //cb(data)
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

function getpendingrequest(user_id, cb) {
  userModel.find({ user_id: user_id }, function (err, data) {
    if (data) {
      data = data[0].friend_request;
      data.forEach(pendingrequest => {
        userModel.find({user_id: pendingrequest}, function(err, list){
          if(list) {
            cb(list)
          }
        })
      })
    
    } else {
      cb(null);
    }
  });
}

function contactlist(user_id, cb) {
  userModel.find({ user_id: user_id }, function (err, data) {
    if (data) {
      data = data[0].friends;
      data.forEach(contactlist => {
        userModel.find({user_id:contactlist}, function(err, profile) {
          if(profile) {
            cb(profile)
          }
        })
      })
    } else {
      cb(null);
    }
  });
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
