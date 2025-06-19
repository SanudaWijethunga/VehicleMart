const express = require("express");
const {addVehicle, deleteVehicle, getVehicles} = require('../controllers/vehicleController');
const router = express.Router();

router.post('/addVehicle', addVehicle);
router.post('/deleteVehicle', deleteVehicle);
router.get('/getVehicles',getVehicles);

module.exports = router;