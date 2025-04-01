import { useState } from "react";
import '../AddVehicle/AddVehicle.css';


export default function AddVehicle(){

    const[newVehicle, setNewVehicle] = useState({
        vehicleName: "",
        yom: "",
        yor: "",
        price: ""
    });

    const createNewVehicle = (e) =>{
        setNewVehicle({
            ...newVehicle,
            [e.target.name] : e.target.value
        })
    }

    const[vehicleCollection, setVehicleCollection] = useState([]);

    const[message, setMessage] = useState('');

    const addToCollection = (e) =>{
        if(!newVehicle.vehicleName || !newVehicle.yom || !newVehicle.yor || !newVehicle.price){
            setMessage("All fields are required");
            e.preventDefault();
        }
        else{
            setMessage("");
            e.preventDefault();
            setVehicleCollection([
                ...vehicleCollection,
                newVehicle
            ])

            setNewVehicle({
                vehicleName: "",
                yom: "",
                yor: "",
                price: ""
            })
        }
    }

    const [emptyMessage, setEmptyMessage] = useState('');

    const showCollection = () =>{
        if(vehicleCollection.length == 0){
            setEmptyMessage("No added vehicles")
        }
    }

    return(
        <div className="content">
            <div className="form-section">
                <h2>Add a new Vehicle</h2>
                <form action={addToCollection}>
                    <input 
                        type="text"
                        placeholder="Enter vehicle name"
                        name="vehicleName"
                        value={newVehicle.vehicleName}
                        onChange={createNewVehicle}
                    />
                    <input 
                        type="number"
                        placeholder="Enter year of made"
                        name="yom"
                        value={newVehicle.yom}
                        onChange={createNewVehicle}
                    />
                    <input 
                        type="number"
                        placeholder="Enter year of registration"
                        name="yor"
                        value={newVehicle.yor}
                        onChange={createNewVehicle}
                    />
                    <input 
                        type="number"
                        placeholder="Enter vehicle price"
                        name="price"
                        value={newVehicle.price}
                        onChange={createNewVehicle}
                    />
                    <p>{message}</p>
                    <button onClick={addToCollection}>Add vehicle</button>
                </form>
            </div>
            <div className="display-section">
                <h2>Vehicle Collection</h2>
                <div className="vehicle-card">
                    {vehicleCollection.map((vehicle, index) => (
                        <div className = "card" key={index}>
                            <p className="v-name">{vehicle.vehicleName}</p>
                            <p>Price: {vehicle.price}</p>
                            <p>Made year : {vehicle.yom}</p>
                            <p>Reg year : {vehicle.yor}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}