// Items.jsx

import { useState, useEffect } from "react";

const Items = () => {
    const [items, setItems] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        // fetch items
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setItems(data);
                // initialize quantities for each item
                const initialQuantities = {};
                data.forEach(item => {
                    initialQuantities[item.id] = 1;
                });
                setQuantities(initialQuantities);
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleQuantityChange = (itemId, newQuantity) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(1, parseInt(newQuantity) || 1)
        }));
    };

    return (
        <div className="itemContainer">
            {items.map(item => (
                <div
                    key={item.id}
                    className="itemSingle"
                >
                    <h3 className="itemName">{item.title}</h3>
                    <p className="itemPrice">${item.price}</p>
                    <input 
                        className="quantityAmount" 
                        type="number" 
                        value={quantities[item.id] || 1}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                    <button className="addCard">Add To Cart</button>
                </div>
            ))}
        </div>
    );
};

export default Items;