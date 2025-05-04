import axios from 'axios';

export const getSummaryFromGemini = async (text: string) => {
  try {
    const response = await axios.post(
      'https://gemini.googleapis.com/v1alpha/summarizeText', // URL may vary; check documentation
      {
        apiKey:' AIzaSyDEvAUdgUGdfq2dfDl7ty5WL4VNqG5DXTw', // Use your environment variable to store the API key securely
        model:"gemini-2.5-pro-preview-03-25", // Specify the Gemini model for summarization (check documentation for specific model ID)
        text: text, // The blog content you want to summarize
      }
    );
    return response.data.summary; // Return the summarized text from Gemini API
  } catch (error) {
    console.error('Error getting summary from Gemini:', error);
    return null;
  }
};
