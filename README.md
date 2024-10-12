# News Aggregator API

## Overview

The **News Aggregator API** is a backend service that aggregates news articles from external sources, allowing users to fetch, search, and manage news articles based on their preferences. Users can mark articles as read or favorite, and cached data is periodically updated for improved performance.

### Key Features
- Fetch news articles from an external API (e.g., NewsAPI) based on user preferences.
- Cache news articles to reduce API calls.
- Allow users to mark articles as read or favorite.
- Search functionality to find news articles using keywords.
- Periodic cache updates for real-time news aggregation.

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (Node Package Manager)
- A NewsAPI account to obtain an API key: [NewsAPI.org](https://newsapi.org/)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/news-aggregator-api.git
   cd news-aggregator-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following content:

   ```bash
   PORT=3000
   NEWS_API_KEY=your-news-api-key
   ```

4. **Run the server**
   ```bash
   npm start
   ```

5. **Run tests**
   ```bash
   npm run test
   ```

---

## API Endpoints

### Authentication

All routes are protected and require user authentication through a valid JWT token.

### 1. Fetch News Articles Based on Preferences

**GET** `/news`

- Fetch news articles based on the user's preferences (category, region, etc.).
  
**Request Parameters:**
- Headers: `Authorization: Bearer <token>`
  
**Response:**
- Status: 200 (OK)
- Body:
  ```json
  {
    "articles": [
      {
        "source": { "id": "bbc-news", "name": "BBC News" },
        "author": "Author Name",
        "title": "News Title",
        "description": "News description",
        "url": "https://news-url.com",
        "urlToImage": "https://image-url.com",
        "publishedAt": "2024-10-10T12:00:00Z",
        "content": "Full article content"
      },
      ...
    ]
  }
  ```

### 2. Mark Article as Read

**POST** `/news/:id/read`

- Mark a news article as read based on its unique ID.
  
**Request Parameters:**
- URL Param: `id` (the ID of the article)
- Headers: `Authorization: Bearer <token>`
  
**Response:**
- Status: 200 (OK)
- Body:
  ```json
  { "message": "Article marked as read" }
  ```

### 3. Mark Article as Favorite

**POST** `/news/:id/favorite`

- Mark a news article as a favorite based on its unique ID.
  
**Request Parameters:**
- URL Param: `id` (the ID of the article)
- Headers: `Authorization: Bearer <token>`
  
**Response:**
- Status: 200 (OK)
- Body:
  ```json
  { "message": "Article marked as favorite" }
  ```

### 4. Retrieve All Read Articles

**GET** `/news/read`

- Fetch all the articles marked as read by the user.
  
**Request Parameters:**
- Headers: `Authorization: Bearer <token>`
  
**Response:**
- Status: 200 (OK)
- Body:
  ```json
  {
    "readArticles": [ /* Array of read articles */ ]
  }
  ```

### 5. Retrieve All Favorite Articles

**GET** `/news/favorites`

- Fetch all the articles marked as favorites by the user.
  
**Request Parameters:**
- Headers: `Authorization: Bearer <token>`
  
**Response:**
- Status: 200 (OK)
- Body:
  ```json
  {
    "favoriteArticles": [ /* Array of favorite articles */ ]
  }
  ```

### 6. Search Articles by Keyword

**GET** `/news/search/:keyword`

- Search news articles by a specific keyword.
  
**Request Parameters:**
- URL Param: `keyword` (the keyword to search for)
- Headers: `Authorization: Bearer <token>`
  
**Response:**
- Status: 200 (OK)
- Body:
  ```json
  {
    "articles": [ /* Array of search result articles */ ]
  }
  ```

---

## Testing

Run the following command to execute the tests and ensure everything is working correctly:

```bash
npm run test
```

---
