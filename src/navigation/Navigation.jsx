// Navigation.jsx

import { Link } from "react-router";

const Navigation = () => {
    return (
        <div>
            <h1>Hello from nav page!</h1>
            <p>I should show on all the pages.</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/cart">Cart page</Link>
                    </li>
                    <li>
                        <Link to="/home">Home page</Link>
                    </li>
                    <li>
                        <Link to="/shop">Shop page</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;