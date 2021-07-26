const Comment = require('../models/comment');

exports.getCommentList = async (req, res) => {
  console.log('getCommentList executed...');
  try {
    const tasks = await Comment.find();
    return res.json(tasks);
  } catch (e) {
    console.log(e);
  }
};

exports.getCommentById = async (req, res) => {
  console.log(`getCommentById executed...
    Param: ${req.params.id}`);
  try {
    const task = await Task.find({
      _id: req.params.id
    });
    return res.json(task);
  } catch (e) {
    console.log(e);
  }
};

exports.insertComment = async (req, res) => {
  console.log('insertComment executed...');
  try {
    const cmn = new Comment(req.body);
    const result = await cmn.save();
    return res.json({ result });
  } catch (e) {
    console.log(e);
  }
};

exports.updateComment = async (req, res) => {
  console.log('updateComment called...');
  try {
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
    const result = await Comment.deleteOne({
      _id: req.params.id
    });
    console.log(
      `Comment ${req.params.id} deleted = ${result.deletedCount}`
    );
    return res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    console.log(e);
  }
};
