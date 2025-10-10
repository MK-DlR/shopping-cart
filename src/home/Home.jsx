// Home.jsx

import poppo from "../../poppo.gif";
import styles from "./home.module.css"

const Home = () => {
    return (
        <div>
            <h1>Hello from home page!</h1>
            <img 
                src={poppo}
                className={styles.homeGif}
                alt="Majima and Kiryu from the Yakuza series in Poppos"/>
        </div>
    );
};

export default Home;