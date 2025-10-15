// Shop.jsx

import { useOutletContext } from "react-router";
import Items from "./Items.jsx";
import styles from "./items.module.css";

const Shop = () => {
    const { cartArray, setCartArray } = useOutletContext();

    return (
        <div className={styles.shopContainer}>
            <h1 className={styles.header}>Newest Deals</h1>
            <Items cartArray={cartArray} setCartArray={setCartArray}/>
        </div>
    );
};

export default Shop;