const Book = require("../models/booking");
const Room = require("../models/room");

const bookCtrl = {

    createBookingRequest: async (req,res) => {
        
        try {
            const { roomId } = req.body
            const room = await Room.findById(roomId).populate("owner")
              if(!room) {
                return res.status(404).json({ msg: "Room not found" });
            }
            const newBookingRequest = new Book({
                user: req.user.id,
                 room: roomId,
                 owner: room.owner._id,   
                 bookingDate: req.body.bookingDate,
                 bookingTime: req.body.bookingTime, 
                 });
                await newBookingRequest.save();
                res.json(newBookingRequest);
            
           } catch (error) {
               
                res.status(500).json({ msg: error.message });
           }




     }



}

module.exports = bookCtrl