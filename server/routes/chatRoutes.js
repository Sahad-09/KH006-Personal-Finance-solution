import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

import OpenAI from "openai";

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "assistant",
                    content: prompt,
                },
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        res.send(response.choices[0].message.content);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
