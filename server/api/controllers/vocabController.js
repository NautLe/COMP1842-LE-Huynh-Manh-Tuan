const mongoose = require('mongoose');
const Vocab = require('../models/vocabModel');


exports.list_all_words = async (req, res) => {
  try {
    const words = await Vocab.find();
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.create_a_word = async (req, res) => {
  try {
    const newWord = new Vocab(req.body);
    const saved = await newWord.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.read_a_word = async (req, res) => {
  try {
    const word = await Vocab.findById(req.params.wordId);
    if (!word) return res.status(404).json({ message: 'Word not found' });
    res.json(word); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.update_a_word = async (req, res) => {
  try {
    const updated = await Vocab.findByIdAndUpdate(
      req.params.wordId,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.delete_a_word = async (req, res) => {
  try {
    await Vocab.deleteOne({ _id: req.params.wordId });
    res.json({
      message: 'Word successfully deleted',
      _id: req.params.wordId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

