import React, { useEffect, useState } from "react";
import "./ListComponent.scss";
const ListComponent = () => {
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3002/api/list");
      const data = await response.json();
      setFormDataList(data.reverse());
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Form Data from the Last 24 Hours</h2>
      <ul>
        {formDataList.map((data, index) => (
          <li key={index}>
            <p>Name: {data.name}</p>
            <p>Phone Number: {data.phoneNumber}</p>
            <p>Address: {data.address}</p>
            <p>Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
