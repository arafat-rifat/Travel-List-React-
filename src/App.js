import React from "react";
import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 5, packed: true },
];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id){
     setItems((items)=> items.filter(item => item.id !== id))
  }

  function handleToggleItem(id){
    setItems((items)=> items.map((item)=> item.id === id ? {...item, packed: !item.packed} : item ))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItems={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  );
}

export default App;

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({onAddItems}) {
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
}

function PackingList({items,onDeleteItems,onToggleItem}) {

 const [sortBy , setSortBy] = useState("packed")


  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} 
          key={item.id} 
          onDeleteItems={onDeleteItems}
          onToggleItem={onToggleItem}
          />
        ))}
      </ul>
       
       <div className="actions">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value='input'>Sort by input order</option>
              <option value='description'> Sort by description</option>

              <option value='packed'>Sort by packed status</option>
            </select>
       </div>
      
    </div>
  );
}

function Item({ item,onDeleteItems,onToggleItem}) {
  return (
    <li>
      <input type="checkbox"
       value={item.packed} 
       onChange={() => onToggleItem(item.id)}
       />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={()=>onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({items}) {
 
  if (!items.length) return(
    <p className="stats">
       <em>Start Adding some items to your packing list 🚀</em>
    </p>
  );

  const numItem= items.length
  const numPacked = items.filter((item) => item.packed).length
  const percentage = Math.round((numPacked / numItem) * 100)
  return (
    <footer className="stats">

      <em>
        {percentage === 100 ? "You got everything! Ready to go ✈️" :
        
        `
        😎 You have ${numItem} items on your list, and you already packed ${numPacked} (${percentage}%)

        `
        
      
      }
      </em>
    </footer>
  );
}
