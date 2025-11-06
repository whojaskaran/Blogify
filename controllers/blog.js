const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateBlog(req, res) {
  console.log('Generating blog with prompt:', req.body.prompt);
  const { prompt } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [{ role: "user", content: `Generate a blog post with a title and body based on the following prompt: ${prompt}. Separate the title and body with a newline character. The title should be on the first line.` }],
    });

    const text = chatCompletion.choices[0].message.content;


    const [title, ...body] = text.split('\n');

    res.json({ title, body: body.join('\n') });
  } catch (error) {
    console.error("Error generating blog:", error);
    res.status(500).json({ error: "Failed to generate blog" });
  }
}

module.exports = {
  generateBlog,
};
