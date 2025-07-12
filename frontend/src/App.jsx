import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // This file holds basic styling

// We define the backend URL as a constant.
// This makes it easy to change if we deploy our backend elsewhere.
const API_URL = 'http://localhost:3001/api';

function App() {
    const [menuItems, setMenuItems] = useState([]); // State to store the menu items
    const [error, setError] = useState(null);       // State to store any errors

    // useEffect hook to fetch data when the component loads
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                // Make a GET request to our new backend endpoint
                const response = await axios.get(`${API_URL}/menu-items`);
                setMenuItems(response.data); // Update our state with the data from the backend
            } catch (err) {
                console.error("Error fetching menu items:", err);
                setError("Failed to load menu items. Is the backend server running?");
            }
        };

        fetchMenuItems();
    }, []); // The empty dependency array [] means this effect runs only once

    return (
        <div className="app">
            <header className="app-header">
                <h1>Kandyan Spice POS</h1>
            </header>
            <main className="app-main">
                <h2>Menu</h2>
                {error && <p className="error-message">{error}</p>}
                
                {/* Display a message if the menu is empty */}
                {!error && menuItems.length === 0 && (
                    <p>No menu items found. Please add some in the admin panel.</p>
                )}

                {/* This part is ready for when we have data. It will loop over menuItems and display them. */}
                <ul>
                    {menuItems.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;