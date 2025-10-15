// Navigation.jsx

import PropTypes from "prop-types";
import { Link } from "react-router";
import styles from "./navigation.module.css";

const Navigation = ({ cartCount }) => {
    return (
        <div className={styles.nav}>
            <nav>
                <Link to="/home">Home</Link> | <Link to="/shop">Shop</Link> | <Link to="/cart">Cart ({cartCount})</Link>
            </nav>
        </div>
    );
};

Navigation.propTypes = {
    cartCount: PropTypes.number.isRequired,
}

export default Navigation;