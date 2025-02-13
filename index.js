const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

const FLAG = "CTF{input_length_is_74}";

// ✅ Serve the HTML file directly (since no templates folder)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Hyper.html"));
});

// ✅ Serve JavaScript and other static files directly
app.use(express.static(__dirname));

// ✅ API route to check input length
app.post("/check", (req, res) => {
    try {
        const { input } = req.body;
        
        if (!input) {
            return res.status(400).json({ message: "Invalid request!" });
        }

        if (input.length === 74) {
            return res.json({ message: FLAG });
        } else {
            return res.json({ message: "Try again!" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error!" });
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
