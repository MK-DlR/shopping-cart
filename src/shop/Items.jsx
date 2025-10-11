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
                    initialQuantities[item.id] = 0;
                });
                setQuantities(initialQuantities);
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleQuantityChange = (itemId, newQuantity) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(0, parseInt(newQuantity))
        }));
    };

    const handleIncrement = (itemId) => {
        const newQuantity = quantities[itemId] + 1;
        handleQuantityChange(itemId, newQuantity);
        addCart(itemId, newQuantity);
    };

    const handleDecrement = (itemId) => {
        const newQuantity = quantities[itemId] - 1;
        handleQuantityChange(itemId, newQuantity);
        addCart(itemId, newQuantity);
    };

    const handleManualChange = (itemId, newQuantity) => {
        let checkType;
        checkType = parseInt(newQuantity);
        isNaN(checkType);
        if (isNaN(checkType)) {
            checkType = 0;
        }
        handleQuantityChange(itemId, checkType);
        addCart(itemId, checkType);
    };

    // adds the selected amount of that item to the cart
    const addCart = (itemId, newQuantity) => {
        console.log(`Added to cart: ${newQuantity} of item number ${itemId}`);

        setCartArray(prev => {
            // remove item from cart if quantity is decremented to 0
            if (newQuantity <= 0) {
            // filter out all items with that itemId
            const filteredCart = prev.filter(item => item.id !== itemId);
            // return early
            return filteredCart;
        }

            // check if item already exists in cart
            const itemExists = prev.some(item => item.id === itemId);
            
            if (itemExists) {
                // remove all instances of this item and add one with new quantity
                const filteredCart = prev.filter(item => item.id !== itemId);
                const foundItem = items.find(item => item.id === itemId);
                return [...filteredCart, { 
                    id: itemId, 
                    title: foundItem.title, 
                    price: foundItem.price, 
                    image: foundItem.image, 
                    quantity: newQuantity 
                }];
            } else {
                // item doesn't exist, add it
                const foundItem = items.find(item => item.id === itemId);
                return [...prev, { 
                    id: itemId, 
                    title: foundItem.title, 
                    price: foundItem.price, 
                    image: foundItem.image, 
                    quantity: newQuantity 
                }];
            }
        });
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
                    <div className="inputGroup">
                        <button id={`decrement-${item.id}`} 
                            onClick={() => handleDecrement(item.id)}>-</button>
                        <input type="text" id="input" 
                            value={quantities[item.id]} 
                            onChange={(e) => handleManualChange(item.id, e.target.value)}/>
                        <button id={`increment-${item.id}`} 
                            onClick={() => handleIncrement(item.id)}>+</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Items;