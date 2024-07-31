// src/components/InputPage/InputPage.js
import React, { useState, useEffect } from "react";
// import "./InputPage.scss";

const InputPage = () => {
  const [link, setLink] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    // Retrieve the link from backend and set it as placeholder
    const fetchLink = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/settings");
        if (!response.ok) throw new Error("Failed to fetch redirect link");
        const data = await response.json();
        setPlaceholder(data.redirectLink || "");
        setLink(data.redirectLink || "");
      } catch (error) {
        console.error("Failed to fetch redirect link", error);
        setPlaceholder("");
        setLink("");
      }
    };

    fetchLink();
  }, []);

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure the link includes the protocol
    const fullLink =
      link.startsWith("http://") || link.startsWith("https://")
        ? link
        : `http://${link}`;

    try {
      const response = await fetch("http://localhost:3002/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redirectLink: fullLink }),
      });

      if (!response.ok) throw new Error("Failed to update redirect link");

      // Optionally, you can display a success message here
      console.log("Redirect link updated successfully");
    } catch (error) {
      console.error("Failed to submit link", error);
    }
  };

  return (
    <div className="input-page">
      <h1>Enter Redirect Link</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={handleLinkChange}
            placeholder=""
            // Ensuring the placeholder is displayed correctly
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default InputPage;
