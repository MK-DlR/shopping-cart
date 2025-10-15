// Cart.jsx

import { useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import CheckoutModal from "./CheckoutModal";
import styles from "../shop/items.module.css";

const Cart = () => {
    const { quantities, cartArray, setCartArray, handleIncrement, handleDecrement, handleManualChange, cartQuantity } = useOutletContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleCheckout = () => {
        setIsModalOpen(true);
    };

    // display items and information in cart
    const cartItems = itemsArray.map((item) =>
        <div
            key={item.id}
            className={styles.itemSingle}
        >
            <div className={styles.imageWrapper}>
                <img className={styles.itemImage} src={item.image} alt={item.title} />
            </div>
            <h3 className={styles.itemName}>{item.title}</h3>
            <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
            <div className={styles.inputAndDelete}>
                <div className={styles.inputGroup}>
                    <button id={`decrement-${item.id}`}
                        onClick={() => handleDecrement(item)}>-</button>
                    <input type="text" id="input"
                        value={quantities[item.id]}
                        onChange={(e) => handleManualChange(item, e.target.value)}/>
                    <button id={`increment-${item.id}`}
                        onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
        </div>
    );

    return (
        <div>
            <h1 className={styles.header}>Shopping Cart</h1>
            <div className={styles.cartContainer}>
                {cartItems}
                <p>Subtotal ({cartQuantity} Items): <b>${priceTotal}</b></p>
                <button className="checkout" onClick={handleCheckout}>Checkout</button>
            </div>
            <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Cart;