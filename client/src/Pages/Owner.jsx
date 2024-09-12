import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { configContext } from "../Context/ConfigContext";

const Owner = () => {
  const { details } = useContext(configContext);
  const [data, setData] = useState({
    location: "",
    price: "",
    amenities: "",
  });

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    console.log("Retrieved Token:", storedToken);
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
        "http://localhost:5000/room/create",
        {
          ...data,
          owner: details._id,
          amenities: data.amenities.split(",").map((amenity) => amenity.trim()),
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
      console.error(
        "Error response:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Error creating room: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Create Your Rooms
          </h2>
                  <form onSubmit={handleSubmit}>
                      <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              required
              name="location"
              placeholder="Room location in details"
              onChange={handleChange}
              value={data.location}
              className="mt-1 block w-full px-3 py-8 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              </div>
                      <div className="mt-4" >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
               Price
            </label>
            <input
              type="number"
              required
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={data.price}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:-indigo-500 sm:text-sm"
              />
              </div>        
            <div className="mt-4" >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
               Amenities
            </label>     
            <input
              type="text"
              required
              name="amenities"
              placeholder="Amenities (comma-separated)"
              onChange={handleChange}
              value={data.amenities}
              className="mt-1 w-full px-3 py-12 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:-indigo-500 sm:text-sm"
              />
              </div>      
                      <div className="mt-4" >  
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Home Front Image
            </label>  
            <input 
              type="file"
              required
              name="file"
              placeholder="Home picture"
              id=""
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
              />
              </div>
            <button  className="w-full mt-8 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Owner;
