// Creating routes
const express = require("express");
const bookRoute = express.Router();
const Book = require("../model/Book");

// Add book
// Next is for catching the errors
bookRoute.route("/add-book").post(async (req, res, next) => {
  try {
    let book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

bookRoute.route("/").get(async (req, res, next) => {
  try {
    let books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

bookRoute.route("/read-book/:id").get(async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

bookRoute.route("/update-book/:id").put(async (req, res, next) => {
  try {
    let updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log("Book updated Successfully!");
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
});

bookRoute.route("/delete-book/:id").delete(async (req, res, next) => {
  try {
    let deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json({ msg: "Book deleted successfully", data: deletedBook });
  } catch (error) {
    next(error);
  }
});

module.exports = bookRoute;
