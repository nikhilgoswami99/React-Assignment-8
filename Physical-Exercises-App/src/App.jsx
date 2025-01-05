import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import Part from "./components/body part List/bodypartList";
import Workout from "./components/body parts/bodypartWorkout";

function App() {
  const [partsArr, setPartsArr] = useState([]);
  let [query, setquery] = useState("");
  let [dataArr, setDataArr] = useState([]);
  let [startIdx, setStartIdx] = useState(0);
  let [endIdx, setEndIdx] = useState(4);
  let [isLoading, setIsLoading] = useState(false); // Loading state
  let [page, setPage] = useState(1); // Current page number
  const limit = 10; // Number of items per page

  // Fetch exercises related to a specific body part with pagination
  async function bodyPartData(bodypart, pageNum = 1) {
    setquery("");
    setIsLoading(true); // Start loading

    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}`,
      params: {
        limit: limit.toString(),
        offset: ((pageNum - 1) * limit).toString(),
      },
      headers: {
        "x-rapidapi-key": "41ef75cbcamsh58da2adee279124p18cba7jsn021699ab6e69",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setDataArr(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  }

  // Navigate pages for exercises
  function nextPage() {
    setPage((prev) => prev + 1);
    bodyPartData(query, page + 1);
  }

  function prevPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
      bodyPartData(query, page - 1);
    }
  }

  // Logic for traversing partsArr
  function moveRight() {
    if (endIdx < partsArr.length) {
      setStartIdx((prev) => prev + 1);
      setEndIdx((prev) => prev + 1);
    }
  }

  function moveLeft() {
    if (startIdx > 0) {
      setStartIdx((prev) => prev - 1);
      setEndIdx((prev) => prev - 1);
    }
  }

  // Fetch body parts list from the API
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
      headers: {
        "x-rapidapi-key": "41ef75cbcamsh58da2adee279124p18cba7jsn021699ab6e69",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };

    async function bodyPartList() {
      try {
        const response = await axios.request(options);
        setPartsArr(response.data);
      } catch (error) {
        console.error("Error fetching body parts list", error);
      }
    }

    bodyPartList();
  }, []);

  return (
    <>
      <h1 className={styles.heading}>Awesome Exercises You Should Know</h1>
      <div className={styles.container}>
        <input
          placeholder="Enter bodypart name"
          id="search"
          className={styles.search}
          type="text"
          onChange={(e) => setquery((e.target.value).trim())}
          value={query}
        />
        <button
          onClick={() => {
            bodyPartData(query, 1); // Reset to page 1 when searching
            setPage(1);
          }}
          className={styles.search_btn}
        >
          Search
        </button>
      </div>

      <h4 style={{color: "white", fontSize: "20px"}}>Available Body Parts :-</h4>

      <div className={styles.body_parts_container}>
        <button onClick={moveLeft} className={styles.left}>
          ←
        </button>
        {partsArr.slice(startIdx, endIdx).map((ele, idx) => (
          <Part key={idx} name={ele} />
        ))}
        <button onClick={moveRight} className={styles.right}>
          →
        </button>
      </div>

      <div className={styles.pagination}>
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={styles.pagination_btn}
        >
          Previous
        </button>
        <span className={styles.page_indicator}>Page {page}</span>
        <button
          onClick={nextPage}
          disabled={dataArr.length < limit} // Disable if no more data
          className={styles.pagination_btn}
        >
          Next
        </button>
      </div>

      <div className={styles.exercise_container}>
        {isLoading ? (
          <div className={styles.loading}>
            <img src="https://media.tenor.com/t5DMW5PI8mgAAAAj/loading-green-loading.gif" alt="Loading..." />
          </div>
        ) : (
          dataArr.map((exe, idx) => <Workout key={idx} {...exe}></Workout>)
        )}
      </div>

      
    </>
  );
}

export default App;
