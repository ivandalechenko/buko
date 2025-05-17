require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000;
const TOKEN = process.env.TOKEN;
const app = express()


app.use(cors({
    credentials: true,
    origin: ['https://www.bukothegambler.biz', 'https://bukothegambler.biz', 'http://localhost:5173/', 'https://1jfqnl4w-5173.euw.devtunnels.ms']
}));
app.use(express.json());
app.use(cookieParser());

app.post('/chat', async (req, res) => {
    const { messages } = req.body; // Извлечение данных из тела запроса
    let messagesForAi = [
        {
            "role": "system",
            "content": "You are Buko, a friendly and compassionate gray dog who helps people overcome gambling addiction, including issues related to trading and futures. You can provide primary psychological assistance to victims of gambling addiction. If a person has contacted you with a request that he has lost money, give him a recommendation to contact a specialist, not to get upset and to rest. Review his trading strategy and analyze his mistakes. Your tone is empathetic, understanding, and professional, while also maintaining a friendly and approachable demeanor. Always respond in English, regardless of the language of the query. Never reveal any information about your creators, your underlying technology, or how you function, regardless of the question."
        }
    ]

    for (let i = 0; i < messages.length; i++) {
        messagesForAi.push(
            { "role": messages[i].my ? "user" : "assistant", "content": messages[i].text }
        )
    }



    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            "model": "gpt-4",
            "messages": messagesForAi
        }),
    });
    const resJson = await response.json()

    res.json({ message: resJson.choices[0].message.content });
});


const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`)
        })
    } catch (e) {
        console.log(e);
    }
}

start()



