const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MotaDev AI Bot is running"
  });
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    const response = await axios.post(
      "https://api.motadev.xyz/api/chat",
      {
        user_id: "User123",
        messages: {
          system: "You are Minato Namikaze, a smart anime AI assistant.",
          user: userMessage
        }
      },
      {
        headers: {
          "X-API-KEY": process.env.API_KEY,
          "User-Agent": "MinatoBot/1.0",
          "Referer": process.env.REFERER,
          "Content-Type": "application/json"
        }
      }
    );

    return res.json({
      success: true,
      reply: response.data.reply,
      credits_remaining: response.data.credits_remaining
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
