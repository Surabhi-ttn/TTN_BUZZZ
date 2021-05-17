const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        profile_pic: {
            type: String,
            default: ""
        }, 
        cover_pic: {
            type: String,
            default: ""
        }, 
        designation: {
            type: String,
            default: "", 
            enum: ['ceo', 'manager', 'software engineer', 'trainee', '']
        }, 
        gender: {
            type: String,
            default: "",  
            enum: ['male', 'female', '']
        }, 
        date_of_birth: {
            type: Date,
            default: ""
        }, 
        website: {
            type: String,
            default: ""
        }, 
        city: {
            type: String,
            default: ""
        }, 
        state: {
            type: String,
            default: ""
        }, 
        pincode: {
            type: Number,
            default: 0
        }, 
        post_count: {
            type: Number,
            default: 0
        }, 
        friends: {
            type: Array
        },
        friend_request: {
            type: Array
        }, 
        is_admin: {
            type: Boolean,
            default: false
        },
        created_at: {
            type: Date,
            default: Date.now()
        }, 
        updated_at: {
            type: Date,
            default: Date.now()
        }
});

const postSchema = new Schema (
    {
        user_id: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            default: []
        },
        caption: {
            type: String,
            default: ""
        }, 
        like_count: {
            type: Number,
            default: 0
        }, 
        dislike_count: {
            type: Number,
            default: 0
        }, 
        comment_count: {
            type: Number,
            default: 0
        }, 
        status: {
            type: String,
            default: "clean", 
            enum: ['flagged', 'clean']
        }, 
        created_at: {
            type: Date,
            default: Date.now()
        }, 
        updated_at: {
            type: Date,
            default: Date.now()
        }
});

const reactionSchema = new Schema (
    {
        post_id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        reaction_type: {
            type: String, 
            enum: ['like', 'dislike', 'comment']
        },
        comment_description: {
            type: String,
            default: ""
        }
});

const userModel = mongoose.model('Users', userSchema);
const postModel = mongoose.model('Posts', postSchema);
const reactionModel = mongoose.model('Reactions', reactionSchema);

module.exports = {
  userModel, postModel, reactionModel
};