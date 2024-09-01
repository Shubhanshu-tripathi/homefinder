const Affidavit = require("../models/affidavit");
const Book = require("../models/booking");
const Room = require("../models/room");
const sendEmail = require("../utils/nodemailer");
const sendaffidavite = require("../utils/sendaffidavite");

const bookCtrl = {
  createBookingRequest: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ msg: "User not authenticated" });
      }
      const { roomId, bookingDate, bookingTime } = req.body;

      if (!roomId || !bookingDate || !bookingTime) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      if (!roomId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ msg: "Invalid room ID" });
      }

      const room = await Room.findById(roomId).populate("owner");

      if (!room) {
        return res.status(404).json({ msg: "Room not found" });
      }

      if (!room.owner || !room.owner.email) {
        return res
          .status(500)
          .json({ msg: "Room owner information is incomplete" });
      }

      // Log the owner's email address
      console.log(`Owner's email: ${room.owner.email}`);

      const newBookingRequest = new Book({
        user: req.user.id,
        room: roomId,
        owner: room.owner._id,
        bookingDate,
        bookingTime,
        status: "pending",
      });

      await newBookingRequest.save();

      // Ensure owner's email is correctly passed
      sendEmail(
        room.owner.email,
        "New Booking Request",
        `You have a new booking request for your room on ${bookingDate} at ${bookingTime}.`
      );
      console.log(room.owner.email);
      res.status(201).json(newBookingRequest);
    } catch (error) {
      console.error("Error creating booking request:", error.message);
      res.status(500).json({ msg: error.message });
    }
  },
  createResponse: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { status, responseMessage } = req.body;

      if (!status || !["accepted", "rejected"].includes(status)) {
        return res.status(400).json({ msg: "Invalid status" });
      }

      const booking = await Book.findById(bookingId).populate("user");

      if (!booking) {
        return res.status(404).json({ msg: "Booking not found" });
      }

      booking.status = status;
      booking.responseMessage = responseMessage || "";
      await booking.save();

      if (status === "accepted") {
        await sendaffidavite(booking.user.email, {
          bookingId: booking._id,
          bookingDate: booking.bookingDate,
          bookingTime: booking.bookingTime,
        });
      } else {
        await sendEmail(
          booking.user.email,
          "Booking Request Status Update",
          `Your booking request for the room on ${booking.bookingDate} at ${
            booking.bookingTime
          } has been ${status}. Admin's response: ${
            responseMessage || "No message"
          }.`
        );
      }

      res
        .status(200)
        .json({ msg: "Booking response updated and user notified" });
    } catch (error) {
      console.error("Error updating booking response:", error.message);
      res.status(500).json({ msg: error.message });
    }
  },


 submitdataform: async (req, res) => {
    try {
      const { bookingId, userId, formdata } = req.body;
  
      if (!formdata || !userId || !bookingId) {
        return res.status(400).json({ msg: "All fields are required" });
      }
  
      const newAffidavit = new Affidavit({
        booking: bookingId,
        user: userId,
        data: formdata
      });
  
      await newAffidavit.save();
  
      const booking = await Book.findById(bookingId).populate("owner");
      if (!booking) {
        return res.status(404).json({ msg: "Booking not found" });
      }
  
      await sendEmail(
        booking.owner.email,
        "New Affidavit Submission",
        `You have a new affidavit submission for your room booking on ${booking.bookingDate} at ${booking.bookingTime}.`
      );
        console.log(booking.owner.email);
        
      res.status(200).json({ msg: "Affidavit submitted successfully" });
    } catch (error) {
      console.error("Error submitting affidavit:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
  
     
};

module.exports = bookCtrl;
