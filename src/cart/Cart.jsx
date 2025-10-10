// Cart.jsx

import { useOutletContext } from "react-router";

const Cart = () => {
    const { cartArray, setCartArray } = useOutletContext();
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

    // temporary:
    const cartItems = itemsArray.map((item, index) => <div key={index}><img src={item.image} />{item.title} - ${item.price} - x{item.quantity}</div>);

    return (
        <div>
            <h1>Hello from cart page!</h1>
            <ul>{cartItems}</ul>
        </div>
    );
};

export default Cart;