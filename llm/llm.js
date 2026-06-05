import Groq from "groq-sdk";
import 'dotenv/config'

const prompt = process.argv.slice(2).join(" ").trim();

const groq = new Groq({
    apiKey: process.env.GROQ_API
});

const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
        //process.argv.slice(2).join(" ")  this line means that the programm accepts the input form the console. eg :  node ./llm/llm.js "how do i make a sandwich"
        { role: "user", content: prompt }
    ]
});
console.log(response.choices[0].message.content);
