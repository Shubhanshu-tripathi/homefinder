const sendEmail = require("./nodemailer")

const sendaffidavite = async(userEmail,bookingDetails) => {
    const formLink = `http://example.com/affidavit-form?bookingId=${bookingDetails.bookingId}`;
    

    await sendEmail(
        userEmail,
         'Affidavit Form for Your Booking',
        `Please fill out the affidavit form for your booking on ${bookingDetails.bookingDate} at ${bookingDetails.bookingTime}. Click the link below to access the form:\n\n${formLink}`
     )
}

module.exports = sendaffidavite;             