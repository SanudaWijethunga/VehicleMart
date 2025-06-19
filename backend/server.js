const express = require("express");
const cors = require("cors");
const ConnectDB = require('./config/dbConnection');
const vehicle = require('./models/vehicle');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
app.use(cors());

ConnectDB();

app.use(express.json());
app.use('/api/vehicle', vehicleRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on PORT 5001");
});