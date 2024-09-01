import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { configContext } from "../Context/ConfigContext";

const Owner = () => {
    const { details } = useContext(configContext);
    const [data, setData] = useState({
        location: '',
        price: '',
        amenities: '',
    });
    
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token'); // Or use localStorage if that's where you store it
        console.log("Retrieved Token:", storedToken); // Check if token is retrieved
        setToken(storedToken);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.price <= 0) {
            toast.error("Price must be a positive number.");
            return;
        }

        if (!token) {
            toast.error("No authentication token found.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(
                'http://localhost:5000/room/create',
                {
                    ...data,
                    owner: details._id,
                    amenities: data.amenities.split(',').map(amenity => amenity.trim()),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
               
            toast.success("Room added successfully!");
            setData({
                location: "",
                price: "",
                amenities: "",
            });
        } catch (error) {
            console.error("Error response:", error.response ? error.response.data : error.message);
            toast.error("Error creating room: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    required
                    name="location"
                    placeholder="Room location"
                    onChange={handleChange}
                    value={data.location}
                />
                <input
                    type="number"
                    required
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    value={data.price}
                />
                <input
                    type="text"
                    required
                    name="amenities"
                    placeholder="Amenities (comma-separated)"
                    onChange={handleChange}
                    value={data.amenities}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </>
    );
};

export default Owner;
