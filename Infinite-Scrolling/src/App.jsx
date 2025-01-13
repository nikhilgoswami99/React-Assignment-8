import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]); // Store fetched images
  const [page, setPage] = useState(1); // Current page for API requests
  const [loading, setLoading] = useState(false); // Loading indicator

  // Fetch data from Unsplash
  const fetchData = async (currentPage) => {
    const accessKey = "2R1VzG4x4BHU4XmhGYgAFlJi7Ql05l829XOPS1SmSdU"; // Unsplash Access Key
    const baseUrl = "https://api.unsplash.com/search/photos";

    const params = {
      page: currentPage,
      query: "Tesla", // Search query
      per_page: 10, // Results per page
    };

    try {
      setLoading(true); // Set loading to true during the fetch
      const response = await fetch(
        `${baseUrl}?page=${params.page}&query=${params.query}&per_page=${params.per_page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setImages((prevImages) => [...prevImages, ...data.results]); // Append new images
    } catch (error) {
      console.error("Error fetching data from Unsplash:", error);
    } finally {
      setLoading(false); // Set loading to false after the fetch
    }
  };

  // Infinite scroll logic
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Check if the user has scrolled near the bottom
    if (scrollHeight - scrollTop <= clientHeight + 100 && !loading) {
      setPage((prevPage) => prevPage + 1); // Increment the page
    }
  };

  // Trigger data fetch on page change
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup listener
    };
  }, [loading]);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Infinite Scroll Image Gallery</h2>
      <div className="image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.urls.small}
            alt={image.alt_description || "Unsplash Image"}
            className="image"
          />
        ))}
      </div>
      {loading && (
        <div className="loader">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default App;
