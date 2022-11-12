const mongoose = require('mongoose');
const _ = require('underscore');

let domoModel = {};

const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  likesSpaghetti: {
    type: Boolean,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  likesSpaghetti: doc.likesSpaghetti,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return domoModel.find(search).select('name age likesSpaghetti').lean().exec(callback);
};

domoModel = mongoose.model('Domo', DomoSchema);

module.exports = domoModel;
