// Description: Handles news related requests.
const axios = require("axios");

exports.news = async (req, res) => {
  console.log("Fetching news articles...");
  console.log("API Key: ", process.env.NEWS_API_KEY);
  console.log("URL: ", process.env.NEWS_URL);
  try {
    // const { category, country } = req.body;
    const apiUrl = `${process.env.NEWS_URL}?country=${process.env.NEWS_COUNTRY}&category=${process.env.NEWS_CATEGORY}&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await axios.get(apiUrl);
    console.log("Response: ", response.data);
    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ message: "No news articles found for your preferences." });
    }

    res.status(200).json({ articles: response.data.articles });
  } catch (error) {
    if (error.response && error.response.data) {
      return res.status(error.response.status).json({
        message: "Error fetching news from external API.",
        details: error.response.data,
      });
    }
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

