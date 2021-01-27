const db = require("../models");
const Item = db.items;

// Create and Save a new item
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Missing property: title" });
    
    return;
  }

  // Create item
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    isAvailable: req.body.isAvailable ? req.body.isAvailable : false,
  });

  // Save item in DB
  item
    .save(item)
    .then((data) => { res.send(data) })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Item.",
      });
    });
};

// Get all items from DB
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: {
        $regex: new RegExp(title),
        $options: "i", // case insensitivity
      } }
    : {};

  Item.find(condition)
    .then((data) => { res.send(data) })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

// Find a single item by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Item.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: `Item id: ${id} was not found` });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || `Server error retrieving item id: ${id}` });
    });
};

// Update a item by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Can not update item with empty values!" });
  }

  const id = req.params.id;

  Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update item with id: ${id}. Maybe item was not found!`,
        });
      } else res.send({ message: "Item was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Error updating item id: ${id}` });
    });
};

// Delete item by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Item.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete item id: ${id}`,
        });
      } else {
        res.send({
          message: "item was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Server Error while trying to delete item id: ${id}` });
    });
};

// Delete all items from DB
exports.deleteAll = (req, res) => {
  Item.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} items were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Server error occurred while delete all items.",
      });
    });
};

// Find all available items
exports.findAvailableItems = (req, res) => {
  Item.find({ isAvailable: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Server error occurred while trying to retrieve items.",
      });
    });
};
