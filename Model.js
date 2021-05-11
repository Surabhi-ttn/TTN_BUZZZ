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
            type: URL,
            default: ""
        }, 
        cover_pic: {
            type: URL,
            default: ""
        }, 
        designation: {
            type: String, 
            enum: ['ceo', 'manager', 'software engineer', 'trainee']
        }, 
        gender: {
            type: String, 
            enum: ['male', 'female']
        }, 
        date_of_birth: {
            type: Date
        }, 
        website: {
            type: URL,
            required: true
        }, 
        city: {
            type: String,
        }, 
        state: {
            type: String,
        }, 
        pincode: {
            type: Number,
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
        post_id: {
            type: String,
            required: true
        },
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
            enum: ['Flagged', 'Clean']
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
        reaction_id: {
            type: Number,
            required: true
        },
        post_id: {
            type: Number,
            required: true
        },
        user_id: {
            type: Number,
            required: true
        },
        reaction_type: {
            type: String, 
            enum: ['Like', 'Dislike', 'Comment']
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
  itemsModel, postModel, reactionModel
};