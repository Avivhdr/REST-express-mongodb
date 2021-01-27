module.exports = (app) => {
  const items = require("../controllers/item.controller.js");

  var router = require("express").Router();

  // Create a new item
  router.post("/", items.create);

  // Retrieve all items
  router.get("/", items.findAll);

  // Retrieve all isAvailable items
  router.get("/isAvailable", items.findAvailableItems);

  // Retrieve a single item with id
  router.get("/:id", items.findOne);

  // Update a item with id
  router.put("/:id", items.update);

  // Delete a item with id
  router.delete("/:id", items.delete);

  // Create a new item
  router.delete("/", items.deleteAll);

  app.use('/api/items', router);
};
