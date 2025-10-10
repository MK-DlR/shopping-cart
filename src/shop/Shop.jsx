// Shop.jsx

import { useOutletContext } from "react-router";
import Items from "./Items.jsx";

const Shop = () => {
    const { cartArray, setCartArray } = useOutletContext();

    return (
        <div>
            <h1>Hello from shop page!</h1>
            <Items cartArray={cartArray} setCartArray={setCartArray}/>
        </div>
    );
};

export default Shop;