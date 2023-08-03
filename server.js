import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/dream", async (req, res) => {
  try {
    const prompt = req.query.prompt;
    const clr = req.query.clr;
    const size = req.query.size;
    // Handle the response from the API
    // For example, you can send the response as the HTTP response to the client
    const response = await axios.get("https://api.imgbun.com/png", {
      params: {
        key: process.env.imgBunKey,
        text: prompt,
        color: clr,
        size: size,
      },
    });
    const image = response.data;
    res.send({ image });
  } catch (error) {
    // Handle any errors that occur during the request
    // For example, you can send an error response to the client
    console.error(error);
    res.status(500).send("An error occurred");
  }
});
app.listen(8080, () => {
  console.log("Listening on port 8080");
  console.log("make art on http://localhost:8080/dream");
});
