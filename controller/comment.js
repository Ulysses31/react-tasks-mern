const Comment = require('../models/comment');
const Task = require('../models/task');

exports.getCommentList = async (req, res) => {
  console.log('getCommentList executed...');
  try {
    const cmn = await Comment.find().populate('user');
    return res.json(cmn);
  } catch (e) {
    console.log(e);
  }
};

exports.getCommentById = async (req, res) => {
  console.log(`getCommentById executed...
    Param: ${req.params.id}`);
  try {
    const cmn = await Task.find({
      _id: req.params.id
    }).populate('user');
    return res.json(cmn);
  } catch (e) {
    console.log(e);
  }
};

exports.insertComment = async (req, res) => {
  console.log('insertComment executed...');
  try {
    req.body._id = null;

    const cmn = new Comment(req.body);
    const cmnResult = await cmn.save();
    const indx = await Comment.findOne({ guid: cmn.guid });

    const result = await Task.updateOne(
      {
        _id: req.body.task
      },
      {
        $push: { comments: indx._id }
      },
      { new: true, useFindAndModify: false }
    );

    return res.json({ cmnResult, result });
  } catch (e) {
    console.log(e);
  }
};

exports.updateComment = async (req, res) => {
  console.log('updateComment called...');
  try {
    req.body.updatedAt = new Date();

    const result = await Comment.updateOne(
      { _id: req.params.id },
      req.body
    );
    console.log(
      `Comment ${req.params.id} updated = ${result.nModified}`
    );
    return res.json({ nModified: result.nModified });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteComment = async (req, res) => {
  console.log('deleteComment called...');
  try {
    // find comment
    const cmnt = await Comment.findOne({
      _id: req.params.id
    });

    // delete comment from task
    const tsk = await Task.updateOne(
      {
        _id: cmnt.task
      },
      {
        $pullAll: {
          comments: [req.params.id]
        }
      },
      {
        new: false,
        useFindAndModify: false
      }
    );

    // delete comment
    const result = await Comment.deleteOne({
      _id: req.params.id
    });
    console.log(`Comment ${req.params.id} deleted`);
    return res.json({ cmnt, tsk, result });
  } catch (e) {
    console.log(e);
  }
};
