import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a witty and helpful conversation starter generator." },
        { role: "user", content: `Give me 5 creative conversation starters about ${topic}.` }
      ]
    });

    const output = completion.choices[0].message.content;
    const ideas = output.split('\n').filter(line => line.trim());

    res.status(200).json({ ideas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
