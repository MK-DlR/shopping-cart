// Shop.jsx

import Navigation from "../navigation/Navigation.jsx";
import Items from "./Items.jsx";

const Shop = () => {
    return (
        <div>
            <Navigation />
            <h1>Hello from shop page!</h1>
            <Items />
        </div>
    );
};

export default Shop;