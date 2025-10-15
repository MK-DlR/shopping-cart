// Home.jsx

import poppologo from "../../poppologo.png";
import styles from "./home.module.css";

const Home = () => {
    return (
        <div className={styles.home}>
            <img 
                src={poppologo}
                className={styles.homeImg}
                alt="The Poppos logo from the Yakuza/RGG series by Sega"/>
            <p>Welcome to Poppo convenience store, where you can find everything you need.</p>
        </div>
    );
};

export default Home;