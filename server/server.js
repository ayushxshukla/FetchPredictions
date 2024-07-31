const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define the path to the JSON files
const dataDirectory = path.join(__dirname, "data");
const formDataFilePath = path.join(dataDirectory, "formData.json");
const settingsFilePath = path.join(dataDirectory, "settings.json");

// Ensure the 'data' directory exists
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
}

// Ensure the 'formData.json' file exists
if (!fs.existsSync(formDataFilePath)) {
  fs.writeFileSync(formDataFilePath, JSON.stringify([])); // Initialize with empty array
}

// Ensure the 'settings.json' file exists
if (!fs.existsSync(settingsFilePath)) {
  fs.writeFileSync(settingsFilePath, JSON.stringify({ redirectLink: "" })); // Initialize with empty link
}

// API endpoint to handle form submissions
app.post("/api/submit", (req, res) => {
  try {
    const data = req.body;

    // Read the existing data from the JSON file
    let formDataList = JSON.parse(fs.readFileSync(formDataFilePath));

    // Add the new data to the list and keep only the last 5 entries
    formDataList.push(data);
    if (formDataList.length > 5) {
      formDataList.shift();
    }

    // Write the updated data back to the JSON file
    fs.writeFileSync(formDataFilePath, JSON.stringify(formDataList, null, 2));

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error in /api/submit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get the form data
app.get("/api/list", (req, res) => {
  try {
    let formDataList = JSON.parse(fs.readFileSync(formDataFilePath));
    res.status(200).json(formDataList);
  } catch (error) {
    console.error("Error in /api/list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get the redirect link
app.get("/api/settings", (req, res) => {
  try {
    let settings = JSON.parse(fs.readFileSync(settingsFilePath));
    res.status(200).json(settings);
  } catch (error) {
    console.error("Error in /api/settings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to set the redirect link
app.post("/api/settings", (req, res) => {
  try {
    const { redirectLink } = req.body;

    // Validate the redirect link format
    if (!redirectLink || !/^https?:\/\/[^\s]+$/.test(redirectLink)) {
      return res.status(400).json({ error: "Invalid redirect link format" });
    }

    // Write the new redirect link to the JSON file
    fs.writeFileSync(
      settingsFilePath,
      JSON.stringify({ redirectLink }, null, 2)
    );

    res.status(200).json({ message: "Redirect link updated successfully" });
  } catch (error) {
    console.error("Error in /api/settings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
