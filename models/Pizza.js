const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    // needed for virtuals and getters to be utilized
    toJSON: {
      virtuals: true,
      getters: true
    },
    // id is normally return by Mongoose but is unnecessary for this situation
    id: false
  }
);

  // get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  // reduce tally ups the totals every comment with it's replies
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

  // create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;