const Room = require("../models/room");


const roomCtrl = {
  createRoom: async (req, res) => {
        const { owner, location, price, amenities, available } = req.body;
        try {
            const newRoom = new Room ({ owner:owner, location, price, amenities, available});
            await newRoom.save();
            res.json(newRoom);
                
            } catch (error) {
                res.status(400).json({ msg: error.message });
            }
    },
    
};

module.exports = roomCtrl;   
