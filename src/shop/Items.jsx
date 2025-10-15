// Items.jsx

import { useOutletContext } from "react-router";
import styles from "./shop.module.css";

const Items = () => {
    const { quantities, handleIncrement, handleDecrement, handleManualChange, items } = useOutletContext();

    return (
        <div className={styles.itemContainer}>
            {items.map(item => (
                <div
                    key={item.id}
                    className={styles.itemSingle}
                >
                    <img className={styles.itemImage} src={item.image} />
                    <h3 className={styles.itemName}>{item.title}</h3>
                    <p className={styles.itemPrice}>${item.price}</p>
                    <div>
                        <button id={`decrement-${item.id}`} 
                            onClick={() => handleDecrement(item)}>-</button>
                        <input type="text" id="input" 
                            value={quantities[item.id]} 
                            onChange={(e) => handleManualChange(item, e.target.value)}/>
                        <button id={`increment-${item.id}`} 
                            onClick={() => handleIncrement(item)}>+</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Items;