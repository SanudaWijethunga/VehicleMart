const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    model: {type:String, required: true},
    vehicleName: {type:String, required: true},
    yom: {type:String, required: true},
    yor: {type:String, required: true},
    price: {type:Number, required: true},
});

module.exports = mongoose.model('vehicle',vehicleSchema);