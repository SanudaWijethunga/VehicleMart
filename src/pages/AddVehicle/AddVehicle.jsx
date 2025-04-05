import { useEffect, useState } from "react";
import '../AddVehicle/AddVehicle.css';

export default function AddVehicle() {

    const [newVehicle, setNewVehicle] = useState({
        model: "",
        vehicleName: "",
        yom: "",
        yor: "",
        price: ""
    });

    const createNewVehicle = (e) => {
        setNewVehicle({
            ...newVehicle,
            [e.target.name]: e.target.value
        })
    }

    const [vehicleCollection, setVehicleCollection] = useState([]);
    const [message, setMessage] = useState('');

    const addToCollection = (e) => {
        e.preventDefault();
        if (!newVehicle.model || !newVehicle.vehicleName || !newVehicle.yom || !newVehicle.yor || !newVehicle.price) {
            setMessage("All fields are required");
        } else {
            setMessage("");
            setVehicleCollection([
                ...vehicleCollection,
                newVehicle
            ]);

            setNewVehicle({
                model: "",
                vehicleName: "",
                yom: "",
                yor: "",
                price: ""
            });
        }
    }

    const [emptyMessage, setEmptyMessage] = useState('');

    const showCollectionEmpty = () => {
        if (vehicleCollection.length === 0) {
            setEmptyMessage("No added vehicles");
        } else {
            setEmptyMessage("");
        }
    }

    useEffect(() => {
        showCollectionEmpty();
    }, [vehicleCollection]);

    const [search, setSearch] = useState("");

    const handleSearch = () => {
        return vehicleCollection.filter(
            item => Object.values(item).some(value => String(value).toLowerCase().includes(search.toLowerCase()))
        );
    }

    return (
        <div className="content">
            <div className="form-section">
                <h2>Add a new Vehicle</h2>
                <form onSubmit={addToCollection}>
                    <select
                        name="model"
                        value={newVehicle.model}
                        onChange={createNewVehicle}
                    >
                        <option value="">Select Model</option>
                        <option>BMW</option>
                        <option>Mercedes-Benz</option>
                        <option>Audi</option>
                        <option>Land Rover</option>
                        <option>Porsche</option>
                        <option>Toyota</option>
                        <option>Honda</option>
                        <option>Nissan</option>
                        <option>Subaru</option>
                        <option>Lexus</option>
                        <option>Tesla</option>
                        <option>BYD</option>
                        <option>Ford</option>
                        <option>Volkswagen</option>
                        <option>Ferrari</option>
                        
                    </select>
                    <input
                        type="text"
                        placeholder="Enter vehicle name"
                        name="vehicleName"
                        value={newVehicle.vehicleName}
                        onChange={createNewVehicle}
                    />
                    <input
                        type="number"
                        placeholder="Enter year of manufacture"
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
                    <button type="submit">Add vehicle</button>
                </form>
            </div>
            <div className="display-section">
                <h2>Vehicle Collection</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Search vehicle"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                <div className="vehicle-card">
                    <p className="empty-message">{emptyMessage}</p>
                    {handleSearch().map((vehicle, index) => (
                        <div className="card" key={index}>
                            <p className="v-name">{vehicle.model} - {vehicle.vehicleName}</p>
                            <p>Price: {vehicle.price}</p>
                            <p>Made year: {vehicle.yom}</p>
                            <p>Registered year: {vehicle.yor}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}