const items = [];

/** Takes in an item and adds it the the database. Returns the item that was
 * added or returns undefined if there is already and element with that name
 * in the database */
function addItem(item) {
  if (getItem(item.name)) {
    return undefined;
  }
  items.push(item);
  return item;
}

/** Takes in a name and returns the item with that name or returns undefined
 * if there is no item with that name */
function getItem(name) {
  return items.find(item => (item.name === name));
}


/** Takes in a name and updateData, dfinds the item with that name and updates
 * the items data with the updateData. Returns the updated item, or undefined
 * in the case that there is no item with the specified name */
function updateItem(name, updateData) {
  const item = getItem(name);
  if (!item) {
    return [false, 1];
  }
  if (updateData.name) {
    const potentialDupe = getItem(updateData.name);
    if (potentialDupe && potentialDupe !== item) {
      return [false, 2];
    }
  }
  for (let attr in updateData) {
    item[attr] = updateData[attr];
  }
  return [true, item];
}

/** Takes in a name and deletes the item witht htat name from the database
 * if it exists. Returns the deleted item or undefined if there is no item
 * with the specified name */
function deleteItem(name) {
  const index = items.findIndex(item => (item.name === name));
  if (index === -1) {
    return undefined;
  }
  return items.splice(index, 1)[0];
}

/** Returns all items */
function getAllItems() {
  return items;
}

module.exports = { addItem, getItem, updateItem, deleteItem, getAllItems, items };