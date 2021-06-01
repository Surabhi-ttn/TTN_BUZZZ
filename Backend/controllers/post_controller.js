const { postModel, userModel } = require("../Model");

function getpost(post_id, cb) {
  postModel.findOne({ _id: post_id }, function (err, data) {
    if (data) {
      cb(data);
    } else {
      cb(null);
    }
  });
}

async function getposts(user_id, cb) {
  let globalposts = []
  let user = await userModel.findOne({"user_id": user_id})
  let allusers = await userModel.find({});
  if(!user) {
    cb(globalposts);
    return;
  }
  let posts = await postModel.find({})
  posts.forEach(post => {
    post = post.toObject()
    if (user.friends.includes(post.user_id) && post.status=="clean") {
      let postowner = allusers.filter(user => user.user_id == post.user_id)[0]
      post["user"] = postowner 
      console.log(post)
      globalposts.push(post)
    }
  })
    globalposts.sort(function(first, second) {
      if(first.created_at <= second.created_at) {
        return 1;
      }
      else {
        return -1;
      }
    })
    cb(globalposts);
  

}

function createpost(postdata, cb) {
  postModel.create(
    {
      user_id: postdata.user_id,
      images: postdata.images,
      caption: postdata.caption,
    },
    function (err, data) {
      if (err) throw err;
      else {
        cb(data);
      }
    }
  );
}

function editpost(postdata, cb) {
  postModel.findOneAndUpdate(
    { _id: postdata.post_id },
    {
      images: postdata.images,
      caption: postdata.caption,
    },
    function (err, data) {
      if (err) throw err;
      else {
        data.images = postdata.images;
        data.caption = postdata.caption;
        cb(data);
      }
    }
  );
}

function deletepost(postdata, cb) {
  postModel.deleteOne({ _id: postdata.post_id }, function (err) {
    if (err) throw err;
    else {
      cb();
    }
  });
}

function reportpost(postdata, cb) {
  postModel.findOneAndUpdate(
    { _id: postdata.post_id },
    {
      status: postdata.status,
    },
    function (err, data) {
      if (err) throw err;
      else {
        data.status = postdata.status;
        cb(data);
      }
    }
  );
}

function approvereportedpost(postdata, cb) {
  postModel.findOneAndUpdate(
    { _id: postdata.post_id },
    {
      status: postdata.status,
    },
    function (err, data) {
      if (err) throw err;
      else {
        data.status = postdata.status;
        cb(data);
      }
    }
  );
}

module.exports = {
  getpost,
  getposts,
  createpost,
  editpost,
  deletepost,
  reportpost,
  approvereportedpost,
};
// console.log("1 " , user.friends)
//       user.friends.forEach(friend => {
//         postModel.find({"user_id": friend}).then(posts => {
//           if(posts) {
//             console.log("2 " , posts)
//             posts.forEach(post => globalposts.push(post))
//           }
//         })
//       }).then(function () {
        
//       cb(globalposts);
//       })

// console.log("3 " , globalposts)
      
//       console.log("4 " , globalposts)





// let globalposts = []
//   let user = await userModel.findOne({"user_id": user_id})
//   if(user) {
//     console.log(user.friends)
//     user.friends.forEach(friend => {
//       let posts = postModel.find({"user_id": friend})
//       posts.forEach(post => globalposts.push(post))
//     })
//     globalposts.sort(function(first, second) {
//       if(first.created_at <= second.created_at) {
//         return 1;
//       }
//       else {
//         return -1;
//       }
//     })
//     cb(globalposts);
//   }