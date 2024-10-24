import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have your API key in your environment variables
});

export default async function handler(req, res) {
  const { nativeLanguage, learningLanguage, level } = req.body;

  if (!nativeLanguage || !learningLanguage || !level) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const prompt = `Generate a ${level} level sentence that mixes ${nativeLanguage} and ${learningLanguage}.`;

    // Send a request to OpenAI to generate the sentence
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for language learners.' },
        { role: 'user', content: prompt },
      ],
    });

    // Extract the generated sentence
    const sentence = response.choices[0].message.content.trim();
    res.status(200).json({ sentence });
  } catch (error) {
    console.error('Error generating sentence:', error);
    res.status(500).json({ error: 'Failed to generate sentence' });
  }
}
