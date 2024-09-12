const Room = require("../models/room");

const roomCtrl = {
  createRoom: async (req, res) => {
    const { owner, location, price, amenities, available } = req.body;
    try {
      const newRoom = new Room({
        owner,
        location,
        price, 
        amenities,
        available,   
      });
      await newRoom.save();
      return res.status(201).json({ message: 'Room created successfully', room: newRoom });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating room', error: error.message });
    }
  },
  updateRoom: async (req, res) => {
    const { owner, location, price, amenities, available } = req.body;
    const roomId = req.params.id;

    console.log(`Updating room with ID: ${roomId}`);
    console.log(`Update details: ${JSON.stringify(req.body)}`);

    try {
      const updatedRoom = await Room.findOneAndUpdate(
        { _id: roomId },
        {
          owner,
          location,
          price,
          amenities,
          available,
        },
        { new: true }
      );

      if (!updatedRoom) {
        console.log(`Room with ID: ${roomId} not found.`);
        return res.status(404).json({ msg: "Room not found" });
      }

      console.log(`Room updated: ${JSON.stringify(updatedRoom)}`);
      res.json({ msg: "Room updated successfully", updatedRoom });
    } catch (error) {
      console.error(`Error updating room: ${error.message}`);
      res.status(400).json({ msg: error.message });
    }
  },
  deleteRoom: async (req, res) => {
    try {
      await Room.findOneAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getRoom: async (req, res) => { 

    try {
              
      const room =  await Room.findById(req.params.id);
      if (!room) return res.status(404).json({ msg: "Room not found" });
            res.json(room)
    } catch (error) {
         
      res.status(500).json({ msg: error.message });
              
            }
  },
  getRoomsByOwner: async (req, res) => {
    const ownerId = req.params.ownerId;
    try {
        const rooms = await Room.find({ owner: ownerId });
        if (rooms.length === 0) return res.status(404).json({ msg: "No rooms found for this owner" });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

    
};

module.exports = roomCtrl;
