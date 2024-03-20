const express = require('express');
const router = new express.Router();


const db = require('./fakeDb');


//Return list of shopping items.
router.get('/', function (req, res) {
  return res.json(db);
});


//Adds item to shopping list.
router.post('/', function (req, res) {
  const item = req.body;
  const findDupe = db.filter(n => n.name === item.name);
  if (findDupe) {
    throw new Error();
  }
  db.push(item);
  return res.json(item);
});


router.get('/:name', function (req, res) {
  const itemName = req.param.name;

  const returnedItem = db.filter(n => n.name === itemName);
  if (returnedItem.length === 0) {
    throw new Error();
  }
  return res.json(returnedItem[0]);
});



module.exports = router;