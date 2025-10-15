// CheckoutModal.jsx

import PropTypes from "prop-types";
import poppo from "../../poppo.gif";
import styles from "./checkoutModal.module.css";

const CheckoutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.checkoutModal} onClick={handleBackdropClick}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <span className={styles.close} onClick={onClose}>&times;</span>
                    <h2>Checkout</h2>
                </div>
                <div className={styles.modalBody}>
                    <p>Your order is being processed...</p>
                    <img 
                        src={poppo}
                        className={styles.modalGif}
                        alt="Majima and Kiryu in Poppos from the Yakuza/RGG series by Sega"/>
                    <p>Would you like that warmed up?</p>
                </div>
                <div className={styles.modalFooter}>
                    <h3>Complete Your Purchase</h3>
                </div>
            </div>
        </div>
    );
};

CheckoutModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default CheckoutModal;