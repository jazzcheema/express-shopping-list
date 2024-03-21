const express = require('express');
const router = new express.Router();
const { BadRequestError, NotFoundError } = require('./expressError');


const { addItem, getItem, updateItem, deleteItem, getAllItems } = require('./fakeDb');


//Return list of shopping items.
router.get('/', function (req, res) {
  return res.json({ items: getAllItems() });
});


/** Route for adding item to the shopping list. Item data should be contained
 * in the request body. Returns added item.
 */

//TODO: add input validation on post (middleware) --

router.post('/', function (req, res) {
  const item = req.body;
  const addedItem = addItem(item);
  if (!addedItem) {
    throw new BadRequestError("Cannot add duplicate item to list.");
  }
  return res.status(201).json({ added: addedItem });
});


/** Route for getting the item with the specified name. Returns the item with
 * the specified name or throws error */
router.get('/:name', function (req, res) {
  const itemName = req.params.name;

  const item = getItem(itemName);
  if (!item) {
    throw new NotFoundError("Item with given name does not exist.");
  }
  return res.json(item);
});

//TODO: add input validation on post (middleware)
/** Route for updating the item with the specified name with the data
 * contained in the request body */
router.patch('/:name', function (req, res) {
  const itemName = req.params.name;
  const updateData = req.body;
  const updatedItem = updateItem(itemName, updateData);
  if (!updatedItem[0]) {
    if (updatedItem[1] === 1) {
      throw new NotFoundError("Item not found in list.");
    }
    if (updatedItem[1] === 2) {
      throw new BadRequestError("Cannot add item to the list as it already exists.");
    }
  }
  return res.json({ updated: updatedItem[1] });
});

/** Route for deleting the item with the specified name */
router.delete('/:name', function (req, res) {
  const itemName = req.params.name;
  const deletedItem = deleteItem(itemName);
  if (!deletedItem) {
    throw new NotFoundError("Item not found in list to delete.");
  }
  return res.json({ message: "Deleted" });
});


module.exports = router;