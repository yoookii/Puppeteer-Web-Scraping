const express = require("express");
const {getListings} = require("./scraper");

const app = express();
const PORT = 3000;

app.get("/api/houses", async (req, res) => {
  try {
    const city = req.query.city; 
    const houses = await getListings(city);
    res.json({ houses });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});