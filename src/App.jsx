// App.jsx

import { useState, useMemo, useEffect } from "react";
import { Outlet } from "react-router";
import Navigation from "./navigation/Navigation";

const App = () => {
  const [cartArray, setCartArray] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    // fetch items
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      setItems(data);
      // initialize quantities for each item
      const initialQuantities = {};
      data.forEach(item => {
        // check if each item exists in cartArray
        const cartItem = cartArray.find(cartItem => cartItem.id === item.id);
        // if yes: use existing quantity
        if (cartItem) {
          initialQuantities[item.id] = cartItem.quantity;
        } else {
          // if no: set to 0
          initialQuantities[item.id] = 0;
        };
      });
      setQuantities(initialQuantities);
    })
    .catch(error => console.error('Error fetching items:', error));
  }, [cartArray]);

  // calculate total amount of cart items
  const calculateCart = (cartArray) => {
    return cartArray.reduce((total, item) => total + item.quantity, 0);
  }

  // cache calculation to only recalculate when cartArray changes
  const cartQuantity = useMemo(() => calculateCart(cartArray), [cartArray]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, parseInt(newQuantity))
    }));
  };

  const handleIncrement = (item) => {
    const newQuantity = quantities[item.id] + 1;
    handleQuantityChange(item.id, newQuantity);
    addCart(item, newQuantity);
  };

  const handleDecrement = (item) => {
    const newQuantity = quantities[item.id] - 1;
    handleQuantityChange(item.id, newQuantity);
    addCart(item, newQuantity);
  };

  const handleManualChange = (item, newQuantity) => {
    let checkType;
    // make sure input is a number
    checkType = parseInt(newQuantity);
    isNaN(checkType);
    // if not a number, set quantity to 0
    if (isNaN(checkType)) {
      checkType = 0;
    }
    handleQuantityChange(item.id, checkType);
    addCart(item, checkType);
  };

  // adds the selected amount of that item to the cart
  const addCart = (item, newQuantity) => {
    console.log(`Added to cart: ${newQuantity} of item number ${item.id}`);

    setCartArray(prev => {
      // remove item from cart if quantity is decremented to 0
      if (newQuantity <= 0) {
        // filter out all items with that itemId
        const filteredCart = prev.filter(cartItem => cartItem.id !== item.id);
        // return early
        return filteredCart;
      }

      // check if item already exists in cart
      const itemExists = prev.some(cartItem => cartItem.id === item.id);

      if (itemExists) {
        // remove all instances of this item and add one with new quantity
        const filteredCart = prev.filter(cartItem => cartItem.id !== item.id);
        return [...filteredCart, { 
          id: item.id, 
          title: item.title, 
          price: item.price, 
          image: item.image, 
          quantity: newQuantity 
        }];
      } else {
        // item doesn't exist, add it
        return [...prev, { 
          id: item.id, 
          title: item.title, 
          price: item.price, 
          image: item.image, 
          quantity: newQuantity 
        }];
      }
    });
  }

  return (
    <div>
      <Navigation cartCount={cartQuantity} />
      <Outlet context={{ 
        cartArray, 
        setCartArray,
        quantities,
        handleIncrement,
        handleDecrement,
        handleManualChange,
        addCart,
        items,
        cartQuantity }} />
    </div>
  );
};

export default App;
