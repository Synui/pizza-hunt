const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// nested within the Comment model instead of being it's own model
const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: 'Please provide reply content!',
      trim: true
    },
    writtenBy: {
      type: String,
      required: 'Please provide your name!',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // for getters to utilize dateFormat 
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: 'Please provide your name!',
      trim: true
    },
    commentBody: {
      type: String,
      required: 'Please provide comment content!',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // for getters to utilize dateFormat 
      get: createdAtVal => dateFormat(createdAtVal)
    },
    // use ReplySchema to validate data for a reply
    replies: [ReplySchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get a count of all the replies for a comment
CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;