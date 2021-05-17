const { userModel } = require("../Model");

function updateUser(user, cb) {
  userModel.findOne({ user_id: user.emails[0].value }, function (err, data) {
    if (err) throw err;
    else {
      if (data) {
        cb(data);
      } else {
        data = new userModel({
          user_id: user.emails[0].value,
          first_name: user.name.givenName,
          last_name: user.name.familyName,
          profile_pic: user.photos[0].value,
        });
        data.save(function (err, newuser) {
          if (err) throw err;
          else {
            cb(newuser);
          }
        });
      }
    }
  });
  //return user;
}

module.exports = { updateUser };
