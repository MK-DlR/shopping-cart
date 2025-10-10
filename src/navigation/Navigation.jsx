// Navigation.jsx

import { Link } from "react-router";

const Navigation = ({ cartCount }) => {
    return (
        <div>
            <nav>
                <Link to="/home">Home</Link> | <Link to="/shop">Shop</Link> | <Link to="/cart">Cart ({cartCount})</Link>
            </nav>
        </div>
    );
};

export default Navigation;