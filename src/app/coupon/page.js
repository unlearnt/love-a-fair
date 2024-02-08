"use client"

import {useState} from "react";

export default function Coupon() {

    const [quantity, setQuantity] = useState(1);
    const [email, setEmail] = useState('');
    const pricePerCoupon = 0.01; // Price per coupon
    const totalPrice = quantity * pricePerCoupon;

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const isValidEmail = email => /\S+@\S+\.\S+/.test(email);

    const renderMobileView = () => (
        <div style={styles.container}>
            <div style={{paddingTop: "2rem"}}>
                <div className="backgroundImage">
                    <Image
                        fill
                        src="/nomura_rainbow.png"
                        alt="rainbow background"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>

            <h1 style={styles.header}>Love-A-Fair</h1>
            <p style={{paddingTop: "2rem", margin: "20px"}}>Our annual Love-A-Fair is back! Be prepared to be blown away by an amazing array of offerings, all
                for a charitable cause! Proceeds from the event go to our beneficiary <a href="https://oogachaga.com/">Oogachaga</a>.
            </p>

            <div style={styles.placeholderImageContainer}>
                <Image src={`/rainbow_coupon.png`} alt="Placeholder" width="1200" height="800" style={styles.placeholderImage}/>
            </div>


            <div style={styles.mobileQuantityControl}>
                <button style={styles.button} onClick={decrementQuantity}>-</button>
                <span style={styles.quantityText}> Quantity: {quantity} </span>
                <button style={styles.button} onClick={incrementQuantity}>+</button>
            </div>

            <div style={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</div>

            <div style={styles.emailInputContainer}>
                <input
                    style={styles.emailInput}
                    type="email"
                    placeholder="john.doe@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <p style={{width: "100%", textAlign: "left"}}> <strong>Note: For Nomura employees, please use your
                Nomura email address to participate in the Employee Donation Matching Program</strong>  </p>

            {isValidEmail(email) && (
                <div style={styles.payPalButtonContainer}>
                    <PayPalButton amount={totalPrice} quantity={quantity} email={email}/>
                </div>
            )}
        </div>
    );


    return (
        <main className="flex flex-col items-center justify-between min-h-screen">

        </main>
    )
}