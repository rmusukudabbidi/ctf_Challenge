const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

const FLAG = "CTF{input_length_is_74}";

// Serve static files from "static" folder (like Flask)
app.use(express.static(path.join(__dirname, "static")));

// Serve the HTML file from "templates" (like Flask's render_template)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "Hyper.html"));
});

// API route to check input length
app.post("/check", (req, res) => {
    try {
        const { input } = req.body;
        console.log(input.length);
        if (!input) {
            return res.status(400).json({ message: "Invalid request!" });
        }


        if (input.length === 2) {
            return res.json({ message: FLAG });
        } else {
            return res.json({ message: "Try again!" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error!" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
