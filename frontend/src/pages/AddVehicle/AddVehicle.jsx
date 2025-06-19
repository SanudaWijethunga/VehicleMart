import { useEffect, useState } from "react";
import '../AddVehicle/AddVehicle.css';
import axios from "axios";

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
        });
    };

    const [vehicleCollection, setVehicleCollection] = useState([]);
    const [message, setMessage] = useState('');

    const addToCollection = async (e) => {
        e.preventDefault();
        setMessage("");

        if(!newVehicle.model || !newVehicle.vehicleName || !newVehicle.yom || !newVehicle.yor || !newVehicle.price){
            setMessage("All fileds are required");
            return;
        }

        if (!newVehicle.model) {
            setMessage("Please select a vehicle brand");
            return;
        }

        if (!newVehicle.vehicleName) {
            setMessage("Please select a vehicle brand");
            return;
        }

        const yom = parseInt(newVehicle.yom);
        const yor = parseInt(newVehicle.yor);
        const price = parseInt(newVehicle.price);

        if (isNaN(yom)) {
            setMessage("Year of manufacture is not valid");
            return;
        }

        if (isNaN(yor)) {
            setMessage("Year of registration is not valid");
            return;
        }

        if (isNaN(price)) {
            setMessage("Price is not valid");
            return;
        }

        if (!/^\d{4}$/.test(yom)) {
            setMessage("Year of manufacture must contain 4 numbers");
            return;
        }

        if (!/^\d{4}$/.test(yor)) {
            setMessage("Year of registration must contain 4 numbers");
            return;
        }

        const currentYear = new Date().getFullYear();

        if (yom > currentYear) {
            setMessage("Year of manufacture cannot be in the future");
            return;
        }

        if (yor > currentYear) {
            setMessage("Year of registration cannot be in the future");
            return;
        }

        if (yom > yor) {
            setMessage("Year of registration cannot be earlier than the year of manufacture");
            return;
        }

        if (price <= 0 || yom <= 0 || yor <= 0) {
            setMessage("Must be an acceptable number");
            return;
        }

        try{
            const response = await axios.post("http://localhost:5001/api/vehicle/addVehicle", newVehicle);
            if (response.status === 201){
                const savedVehicle = response.data.vehicle;
                setVehicleCollection([...vehicleCollection, savedVehicle]);
                setNewVehicle({
                    model: "",
                    vehicleName: "",
                    yom: "",
                    yor: "",
                    price: ""
                });
            }
            else{
                setMessage("Unable to add the vehicle");
            }
        }
        catch(error){
            console.error("Unable to add");
            setMessage("Unable to add the vehicle");
        }
    };

    const [emptyMessage, setEmptyMessage] = useState('');

    const showCollectionEmpty = () => {
        if (vehicleCollection.length === 0) {
            setEmptyMessage("No added used vehicles");
        } else {
            setEmptyMessage("");
        }
    };

    useEffect(() => {
        showCollectionEmpty();
    }, [vehicleCollection]);

    const [search, setSearch] = useState("");

    const handleSearch = () => {
        return vehicleCollection.filter(
            item => Object.values(item).some(value => String(value).toLowerCase().includes(search.toLowerCase()))
        );
    };

    const handleSoldVehicle = async (index) => {
        const soldVehicle = vehicleCollection[index];
        try {
            const response = await axios.post("http://localhost:5001/api/vehicle/deleteVehicle", {
                id: soldVehicle._id
            });

            if (response.status === 201) {
                const updatedVehicleCollection = vehicleCollection.filter((_, i) => i !== index);
                setVehicleCollection(updatedVehicleCollection);
            } else {
                setMessage("Failed to delete the vehicle");
            }
        } catch (error) {
            console.error("Delete failed", error);
            setMessage("Error deleting vehicle");
        }
    };

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/vehicle/getVehicles");
                setVehicleCollection(response.data);
            } catch (error) {
                console.error("Failed to load vehicles", error);
                setEmptyMessage("Failed to load saved vehicles");
            }
        };

        fetchVehicles();
    }, []);

    const[vehicleCount, setVehicleCount] = useState(0);

    const showVehicleCount = () => {
        setVehicleCount(vehicleCollection.length);
    }

    useEffect(()=>{
        showVehicleCount();
    }, [vehicleCollection])


    const[totalVehiclePrice, setTotalVehiclePrice] = useState(0);

    const showTotalVehiclePrice = () => {
        const total = vehicleCollection.reduce((totalVehiclePrice, newVehicle) => {
            return totalVehiclePrice += Number(newVehicle.price);
        }, 0);

        setTotalVehiclePrice(total);
    }

    useEffect(()=> {
        showTotalVehiclePrice();
    }, [vehicleCollection])

    return (
        <div className="content">
            <div className="form-section">
                <h2>Add a new used vehicle</h2>
                <form onSubmit={addToCollection} className="v-details">
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
                    <p className="error-message">{message}</p>
                    <button type="submit">Add vehicle</button>
                </form>
            </div>
            <div className="display-section">
                <h2>Used vehicle collection</h2>
                <form className="search">
                    <input
                        type="text"
                        placeholder="Search vehicle"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                <div className="summary">
                    <h3>Total Number of vehicles - {vehicleCount}</h3>
                    <h3>Total vehicle price -  {totalVehiclePrice}</h3>
                </div>
                <p className="empty-message">{emptyMessage}</p>
                <div className="vehicle-card">
                    {handleSearch().map((vehicle, index) => (
                        <div className="card" key={index}>
                            <p className="v-name">{vehicle.model} - {vehicle.vehicleName}</p>
                            <p>Price: {vehicle.price}</p>
                            <p>Made year: {vehicle.yom}</p>
                            <p>Registered year: {vehicle.yor}</p>
                            <button onClick={() => handleSoldVehicle(index)}>Sold</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}