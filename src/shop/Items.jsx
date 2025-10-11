// Items.jsx

import { useOutletContext } from "react-router";

const Items = () => {
    const { quantities, handleIncrement, handleDecrement, handleManualChange, items } = useOutletContext();

    return (
        <div className="itemContainer">
            {items.map(item => (
                <div
                    key={item.id}
                    className="itemSingle"
                >
                    <img className="itemImage" src={item.image} />
                    <h3 className="itemName">{item.title}</h3>
                    <p className="itemPrice">${item.price}</p>
                    <div className="inputGroup">
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