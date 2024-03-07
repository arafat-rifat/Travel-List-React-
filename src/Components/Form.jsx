import React from "react";
import { useState } from "react";

const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");

  const [quantity, setQuantity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // create new Object
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    console.log(newItem);

    onAddItems(newItem);

    // To set initial state

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
};

export default Form;
