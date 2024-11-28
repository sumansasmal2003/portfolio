const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail (use your email provider's service if not Gmail)
    auth: {
        user: 'sasmalsuman04@gmail.com', // Replace with your email
        pass: 'kmzp rowo efty uxmv', // Replace with your email password (or app-specific password)
    },
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    // Email content
    const mailOptions = {
        from: email, // User's email
        to: 'sasmalsuman04@gmail.com', // Replace with the recipient's email
        subject: `New Message from ${name}`,
        text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
