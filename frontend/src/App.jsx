import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AddMenuItemForm from './components/AddMenuItemForm';

const API_URL = 'http://localhost:3001/api';

function App() {
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);

    // useEffect hook to fetch data when the component first loads
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                // Make a GET request to our backend endpoint
                const response = await axios.get(`${API_URL}/menu-items`);
                setMenuItems(response.data); // Update our state with the data from the backend
            } catch (err) {
                console.error("Error fetching menu items:", err);
                setError("Failed to load menu items. Is the backend server running?");
            }
        };

        fetchMenuItems();
    }, []); // The empty dependency array [] means this effect runs only once on mount

    // This function will be called by the child component (AddMenuItemForm)
    // after a new item has been successfully created.
    const handleItemAdded = (newItem) => {
        // We update the state by creating a new array containing the old items
        // and the new one. This triggers React to re-render the list.
        setMenuItems([...menuItems, newItem]);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Kandyan Spice POS</h1>
            </header>
            <main className="app-main">
                {/* We pass the handleItemAdded function down to the form as a prop */}
                <AddMenuItemForm onItemAdded={handleItemAdded} />

                <h2 style={{ marginTop: '2rem' }}>Menu</h2>
                
                {error && <p className="error-message">{error}</p>}
                
                {/* Display a message if the menu is empty */}
                {!error && menuItems.length === 0 && (
                    <p>No menu items found. Please add some in the admin panel.</p>
                )}

                {/* Render the list of menu items */}
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