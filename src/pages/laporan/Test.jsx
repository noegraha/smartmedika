import React, { useState, useEffect } from "react";
import axios from "axios";

function TestAsync() {
  const [data, setData] = useState(null);
  const [number, setNumber] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://jsonplaceholder.typicode.com/todos/${number}`
      );
      setData(result.data);
    };
    fetchData();
  }, [number]);

  return (
    <div>
      {data ? (
        <div>
          <h1>{data.title}</h1>
          <p>{data.completed ? "Selesai" : "Belum selesai"}</p>
          <input value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
      ) : (
        <p>Sedang memuat data...</p>
      )}
    </div>
  );
}

export default TestAsync;
