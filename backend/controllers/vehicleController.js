const vehicle = require('../models/vehicle');
const Vehicle = require('../models/vehicle');

exports.addVehicle = async (req, res) => {
    try{
        const vehicle = new Vehicle({
            model: req.body.model,
            vehicleName: req.body.vehicleName,
            yom: req.body.yom,
            yor: req.body.yor,
            price: req.body.price,
        });

        await vehicle.save()
        res.status(201).json({ msg: "New vehicle added successfully", vehicle });
    }
    catch(error){
        res.status(500).json({msg: "Can not add the vehicle"});
        console.error("Can not add the vehicle, Try again.");
    }
 }

exports.deleteVehicle = async (req, res) => {
    try {
        const id = req.body.id;
        await Vehicle.findByIdAndDelete(id);
        res.status(201).json({ msg: 'Vehicle deleted successfully' });
    } 
    catch (error) {
        console.error("Can not delete", error);
        res.status(500).json({ msg: "Can not delete the vehicle" });
    }
};


exports.getVehicles = async(req, res) => {
    try{
        const vehicles = await vehicle.find();
        res.status(200).json(vehicles);
    }
    catch(error){
        console.error("Can not get the vehicles");
        res.status(500).json("Can not get the vehicle")
    }
}