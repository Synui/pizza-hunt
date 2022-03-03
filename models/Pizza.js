const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      // either true or personal message
      required: 'Please provide a pizza name!',
      trim: true
    },
    createdBy: {
      type: String,
      // either true or personal message
      required: 'Please provide your name!',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      // either true or personal message
      required: true,
      // enumerable: refers to a set of data that can be iterated over
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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