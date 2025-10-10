// Items.jsx

import { useState, useEffect } from "react";

const Items = ({ cartArray, setCartArray }) => {
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

    // adds the selected amount of that item to the cart
    const addCart = (itemId, newQuantity) => {
        console.log(`Added to cart: ${newQuantity} of item number ${itemId}`);
        
        setCartArray(prev => {
            const newItems = [];
            // find first item where item.id equals itemId
            const foundItem = items.find(item => item.id === itemId);
            // push item info to array
            newItems.push({ id: itemId, title: foundItem.title, price: foundItem.price, image: foundItem.image, quantity: newQuantity })
            // return new array combining previous and new items
            return [...prev, ...newItems];
        })

        console.log(cartArray);
        return cartArray;
    }

    return (
        <div className="itemContainer">
            {items.map(item => (
                <div
                    key={item.id}
                    className="itemSingle"
                >
                    <img className="itemImage" src={item.image} />
                    <h3 className="itemName">{item.title}</h3>
                    <p className="itemPrice">${item.price}</p>
                    <input 
                        className="quantityAmount" 
                        type="number" 
                        value={quantities[item.id] || 1}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                    <button className="addCart" onClick={() => addCart(item.id, quantities[item.id])}>Add To Cart</button>
                </div>
            ))}
        </div>
    );
};

export default Items;