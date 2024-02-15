"use client"

import React, {useEffect, useRef} from 'react';
import {loadScript} from "@paypal/paypal-js";
import {addTransaction} from "@/app/services/actions/addTransaction";

function generateUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const PayPalButton = ({amount, quantity, email}) => {
    const paypalButtonContainerRef = useRef(null); // Using useRef to reference the PayPal button container

    console.log("email ", email)

    const currency = 'SGD';

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const locale = 'en_SG';

    let invoiceId;


    useEffect(() => {

        async function loadPayPal() {
            let paypal;
            try {
                paypal = await loadScript({ clientId, currency, locale });
                if (paypal) {
                    if (paypalButtonContainerRef.current) {
                        // Clear the PayPal button container before rendering new buttons
                        paypalButtonContainerRef.current.innerHTML = "";
                    }

                    paypal.Buttons({
                        createOrder: (data, actions) => {
                            // Set up the transaction
                            invoiceId = generateUUID();
                            return actions.order.create({
                                purchase_units: [{
                                    description: "Your Product Description",
                                    amount: {
                                        currency_code: currency,
                                        value: amount.toString(), // The total amount of the order
                                    },
                                    invoice_id: invoiceId
                                }]
                            });
                        },
                        onApprove: (data, actions) => {
                            // Capture the funds from the transaction
                            return actions.order.capture().then(details => {
                                console.log("Transaction completed successfully", details);

                                console.log("Transaction id is ", details.id);
                                console.log("invoiceId ", invoiceId);


                                let name;

                                if (details.payer.name.full_name){
                                    name = details.payer.name.full_name
                                } else if (details.payer.name.surname){
                                    name = details.payer.name.given_name + " " + details.payer.name.surname;
                                }

                                console.log("Payer name is ", name)


                                let data = {
                                    transactionId : invoiceId,
                                    buyerName : name,
                                    totalAmount: amount,
                                    quantity: quantity,
                                    email: email,
                                }

                                void addTransaction(data);

                                // Here you can add additional code to save transaction details to your server
                                // Example: POST details to your server's API endpoint
                                // axios.post('/api/payment-capture', details);

                                // alert('Transaction completed by ' + details.payer.name.given_name);
                            });
                        },
                        onError: (err) => {
                            // Handle errors
                            console.error("Error during payment processing: ", err);
                            alert("An error occurred during the payment process. Please try again.");
                        }
                    }).render(paypalButtonContainerRef.current).catch(error => {
                        console.error("failed to render the PayPal Buttons", error);
                    });
                }
            } catch (error) {
                console.error("failed to load the PayPal JS SDK script", error);
            }
        }

        void loadPayPal();
    }, [amount, email, quantity]);


    return <div ref={paypalButtonContainerRef} id="paypal-button-container"></div>;
};

export default PayPalButton;
