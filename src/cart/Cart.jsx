// Cart.jsx

import { useOutletContext } from "react-router";

const Cart = () => {
    const { quantities, cartArray, setCartArray, handleIncrement, handleDecrement, handleManualChange, items } = useOutletContext();
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
            <p className="cartTotal">Subtotal (# Items): <b>$[Total Price]</b></p>
            <button className="checkout">Checkout</button>
        </div>
    </div>
);
};

export default Cart;