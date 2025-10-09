// Navigation.jsx

import { Link } from "react-router";

const Navigation = () => {
    return (
        <div>
            <nav>
                <Link to="/home">Home</Link> | <Link to="/shop">Shop</Link> | <Link to="/cart">Cart</Link>
            </nav>
        </div>
    );
};

export default Navigation;