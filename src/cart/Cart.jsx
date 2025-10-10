// Cart.jsx

import { useOutletContext } from "react-router";
import { useState, useEffect } from "react";

const Cart = () => {
    const [quantities, setQuantities] = useState({});
    const { cartArray, setCartArray } = useOutletContext();
    const consolidatedItems = {};

    // TO DO: change this from default displaying 1 to however many items of that type are in the cart
    const handleQuantityChange = (itemId, newQuantity) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(1, parseInt(newQuantity) || 1)
        }));
    };

    // remove specified amount of item from cart
    const updateQuantity = (itemId, removeQuantity) => {
        console.log(`Updated quantity: ${removeQuantity} of item #${itemId}`);
    }

    // delete item from cart entirely
    const deleteItem = (itemId) => {
        console.log(`Deleted: item #${itemId}`);
    }

    // update cart in real time every time quantities change or item is removed

    cartArray.forEach(item => {
        if (consolidatedItems[item.id]) {
            // item exists, add to existing quantity
            consolidatedItems[item.id].quantity += item.quantity;
        } else {
            // item doesn't exist, add new entry with items properties
            consolidatedItems[item.id] = { ...item };
        }
    });

    const itemsArray = Object.values(consolidatedItems);

    // display items and information in cart
    // TO DO: MAKE SURE QUANTITY IN INPUT IS QUANTITY OF ITEM IN CART
    const cartItems = itemsArray.map((item, index) =>
        <div key={index} className="itemSingle">
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
            <button className="updateQuantity" onClick={() => updateQuantity(item.id, quantities[item.id])}>Update Quantity</button>
            <button className="deleteItem" onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
    );

    return (
    <div>
        <h1>Hello from cart page!</h1>
        <div className="itemContainer">
            {cartItems}
        </div>
    </div>
);
};

export default Cart;