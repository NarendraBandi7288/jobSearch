import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Box, TextField } from "@mui/material";
import JobCard from "./components/JobCard";
import Filter from "./components/Filter";

function App() {
  const minExp = [1, 2, 3, 4, 5, 6];
  const locations = ["delhi", "mumbai", "chennai", "banglore", "remote"];
  const workType = ["remote", "onsite", "hybrid"];
  const role = ["frontend", "backend", "ios", "android", "tech lead"];
  const minBasePay = [3, 4, 5, 10, 15, 20, 25, 30];

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreJobs, setHasMoreJobs] = useState(true);
  const [offset, setOffset] = useState(0);

  const observer = useRef(null);
  const lastJobRef = useRef(null);

  useEffect(() => {
    fetchJobs();
  });
  const fetchJobs = () => {
    if (isLoading || !hasMoreJobs) return;
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
        setOffset((prevOffset) => prevOffset + 10);
        setHasMoreJobs(data.jdList.length === 10);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!lastJobRef.current) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && hasMoreJobs) {
        fetchJobs();
      }
    });

    observer.current.observe(lastJobRef.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, hasMoreJobs]);

  return (
    <div className="App">
      <h1>Job Search Portal</h1>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Filter names={minExp} />
        <Filter names={locations} />
        <Filter names={workType} />
        <Filter names={role} />
        <Filter names={minBasePay} />
        <TextField
          sx={{
            width: "auto",
            marginTop: "7px", // Adjust the width as needed, e.g., '400px', '50%', etc.
          }}
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginLeft: "3%",
          "& > *": {
            width: "30%", // Set width for each card to occupy 30% of the container
            marginBottom: "24px", // Add gap between rows
          },
        }}
      >
        {jobs.map((job, index) => (
          <div key={index} ref={index === jobs.length - 1 ? lastJobRef : null}>
            <JobCard jobDetails={job} />
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
      </Box>
    </div>
  );
  // return (
  //   <div className="App">
  //   </div>
  //
  // );
}

export default App;
