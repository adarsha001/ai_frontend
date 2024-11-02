import React, { useState, useEffect } from 'react';

const NewsApp = () => {
  const [input, setInput] = useState('');
  const [news, setNews] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  // Fetch data from the server
  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/news');
      const data = await response.json();
      setNews(data);       // Set initial news data
      setResults(data);     // Display all news initially
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Filter news based on search input
  const handleChange = (value) => {
    setInput(value);
    const filteredResults = news.filter((item) => {
      return (
        value &&
        item &&
        item.title &&
        item.title.toLowerCase().includes(value.toLowerCase())
      );
    });
    setResults(filteredResults);

    // Clear selected news if input is empty
    if (!value) {
      setSelectedNews(null);
    }
  };

  const handleClick = (item) => {
    setSelectedNews(item);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <div className="flex items-center w-full mb-4">
        <input
          type="text"
          placeholder="Search news..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Display Search Results */}
      <div className="mt-4 w-full">
        {results.length > 0 ? (
          results.map((item) => (
            <div
              key={item.id}
              className="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => handleClick(item)}
            >
              {item.title}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news found.</p>
        )}
      </div>

      {/* Display Selected News Details */}
      {selectedNews && (
        <div className="mt-4 p-4 w-full bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">{selectedNews.title}</h2>
          <p>{selectedNews.description}</p>
          <img src={selectedNews.image} alt={selectedNews.title} className="mt-2 w-full max-w-xs mx-auto" />
          <p className="mt-2"><strong>Author:</strong> {selectedNews.author}</p>
          <p><strong>Date:</strong> {selectedNews.date}</p>
          <a href={selectedNews.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Read more
          </a>
        </div>
      )}
    </div>
  );
};

export default NewsApp;
