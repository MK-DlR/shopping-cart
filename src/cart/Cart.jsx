// Cart.jsx

import { useOutletContext } from "react-router";

const Cart = () => {
    const { cartArray, setCartArray } = useOutletContext();

    // create an object
    // that groups items by ID
    // and counts them
    // then map over that instead

    // temporary:
    const cartItems = cartArray.map((item, index) => <div key={index}><img src={item.image} />{item.title} - ${item.price} - x{item.quantity}</div>);

    return (
        <div>
            <h1>Hello from cart page!</h1>
            <ul>{cartItems}</ul>
        </div>
    );
};

export default Cart;