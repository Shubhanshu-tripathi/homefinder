import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { configContext } from "../Context/ConfigContext";

const OwnerProfile = () => {
    const { details } = useContext(configContext);
    const [Rooms, setRooms] = useState([]);   
    const [loading, setLoading] = useState(true);

    const fetchRoom = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `http://localhost:5000/room/owner/${details._id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${details.token}`,
                    },
                    timeout: 20000,
                }
            );
            setRooms(res.data);
        } catch (error) {
            toast.error("Error fetching rooms: " + error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        
        if (details && details.role === "admin") {
            fetchRoom();
        } else {
            setLoading(false);
        }
    }, [details]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!details) {
        return <p>Please log in to view your rooms.</p>;
    }

    if (details.role !== "admin") {
        return <p>You are not an owner, so you have no rooms.</p>;
    }

    return (
        <>
            <h2>Your Rooms</h2>
            {Rooms.length > 0 ? (
                <ul>
                    {Rooms.map((room) => (
                        <li key={room._id}>
                            Location: {room.location}, Price: {room.price}, Amenities: {room.amenities.join(', ')}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No rooms available.</p>
            )}
        </>
    );
}

export default OwnerProfile;
