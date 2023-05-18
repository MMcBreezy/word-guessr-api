require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

class WordHelper {
  static getRandomWord = async () => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Generate a random word suitable for a hangman game. The word should have a minimum of 5 letters and a maximum of 8 letters. Please provide a word that meets the criteria:',
      max_tokens: 10,
    });
    
    const word = response.data.choices[0].text.trim();
    return word;
  }
}



module.exports = WordHelper;
