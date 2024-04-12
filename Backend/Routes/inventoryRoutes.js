const express = require('express')
const router = express.Router()

const {
    getInventory,
    getInventoryItemById,
    createInventoryItem,
    updateInventory,
    deleteInventory
} = require('../Controllers/inventoryController');
const exp = require('constants');

router.get('/inventory', getInventory);
router.get('/inventory/:InventoryID', getInventoryItemById);
router.post('/inventory', createInventoryItem);
router.patch('/inventory/:InventoryID', updateInventory);
router.delete('/inventory/:InventoryID', deleteInventory);

module.exports = router