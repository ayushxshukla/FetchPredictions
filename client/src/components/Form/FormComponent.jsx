// src/components/Form/FormComponent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormComponent.scss";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataWithTimestamp = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    try {
      // const baseUrl = `${window.location.origin}/api`;
      const baseUrl = `http://localhost:3002/api`;
      const response = await fetch(`${baseUrl}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithTimestamp),
      });

      if (!response.ok) throw new Error("Failed to submit data");

      const settingsResponse = await fetch(
        "http://localhost:3002/api/settings"
      );
      if (!settingsResponse.ok)
        throw new Error("Failed to fetch redirect link");

      const settingsData = await settingsResponse.json();
      const redirectLink = settingsData.redirectLink || "/";
      window.location.href = redirectLink;
    } catch (error) {
      console.error("Error during form submission or redirect", error);
    }
  };

  return (
    <div className="form-wrapper">
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default FormComponent;
