const express = require('express');
const router = new express.Router();


const { addItem, getItem, updateItem, deleteItem } = require('./fakeDb');


//Return list of shopping items.
router.get('/', function (req, res) {
  return res.json(db);
});


/** Route for adding item to the shopping list. Item data should be contained
 * in the request body. Returns added item.
 */
router.post('/', function (req, res) {
  const item = req.body;
  const addedItem = addItem(item);
  if (!addedItem) {
    throw new Error();
  }
  return res.json(addedItem);
});

/** Route for getting the item with the specified name. Returns the item with
 * the specified name or throws error */
router.get('/:name', function (req, res) {
  const itemName = req.param.name;

  const item = getItem(itemName);
  if (!item) {
    throw new Error();
  }
  return res.json(item);
});

/** Route for updating the item with the specified name with the data
 * contained in the request body */
router.patch('/:name', function (req, res) {
  const itemName = req.param.name;
  const updateData = req.body;
  const updatedItem = updateItem(itemName, updateData);

  if (!updatedItem) {
    throw new Error();
  }
  return res.json(item);
});

/** Route for deleting the item with the specified name */
router.delete('/:name', function (req, res) {
  const itemName = req.param.name;
  const deletedItem = deleteItem(itemName);
  if (!deletedItem) {
    throw new Error();
  }
  return res.json({ message: "Deleted" });
});


module.exports = router;