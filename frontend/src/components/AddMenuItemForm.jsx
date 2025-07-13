import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

function AddMenuItemForm({ onItemAdded }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Short eats'); // Default value

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission which reloads the page

        const newItem = {
            name,
            price: parseFloat(price), // Convert price to a number
            category,
        };

        // Basic check to ensure price is a valid number
        if (isNaN(newItem.price)) {
            alert("Please enter a valid price.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/menu-items`, newItem);
            
            // Call the function passed down from the parent (App.jsx)
            onItemAdded(response.data); 
            
            // Clear the form fields after successful submission
            setName('');
            setPrice('');
            setCategory('Short eats');
        } catch (error) {
            console.error('Error creating menu item:', error);
            alert('Failed to add menu item.');
        }
    };

    return (
        <div className="form-container">
            <h3>Add New Menu Item</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Item Name"
                    required
                />
                <input
                    type="number"
                    step="0.01" // Allows for decimal prices
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Short eats">Short eats</option>
                    <option value="Rice & Curry">Rice & Curry</option>
                    <option value="Hoppers & Roti">Hoppers & Roti</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Desserts</option>
                </select>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}

export default AddMenuItemForm;