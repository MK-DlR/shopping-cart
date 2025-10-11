// Cart.jsx

import { useMemo } from "react";
import { useOutletContext } from "react-router";

const Cart = () => {
    const { quantities, cartArray, setCartArray, handleIncrement, handleDecrement, handleManualChange, items, cartQuantity } = useOutletContext();
    const consolidatedItems = {};

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

    // delete item from cart entirely
    const deleteItem = (itemId) => {
        console.log(`Deleted: item #${itemId}`);
        setCartArray(prev => prev.filter(item => item.id !== itemId));
    }

    // calculate cart subtotal
    const calculatePrice = (cartArray) => {
        return cartArray.reduce((total, price) => total + (price.price * price.quantity), 0).toFixed(2);
    }

    // cache calculation to only recalculate when cartArray changes
    const priceTotal = useMemo(() => calculatePrice(cartArray), [cartArray]);

    // display items and information in cart
    const cartItems = itemsArray.map((item) =>
        <div
            key={item.id}
            className="itemSingle"
        >
            <img className="itemImage" src={item.image} />
            <h3 className="itemName">{item.title}</h3>
            <p className="itemPrice">${item.price}</p>
            <div className="inputAndDelete">
                <div className="inputGroup">
                    <button id={`decrement-${item.id}`} 
                        onClick={() => handleDecrement(item)}>-</button>
                    <input type="text" id="input" 
                        value={quantities[item.id]} 
                        onChange={(e) => handleManualChange(item, e.target.value)}/>
                    <button id={`increment-${item.id}`} 
                        onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button className="deleteItem" onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
        </div>
    );

    return (
    <div>
        <h1>Hello from cart page!</h1>
        <div className="itemContainer">
            {cartItems}
            <p className="cartTotal">Subtotal ({cartQuantity} Items): <b>${priceTotal}</b></p>
            <button className="checkout">Checkout</button>
        </div>
    </div>
);
};

export default Cart;