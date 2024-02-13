"use client"

import {useEffect, useRef, useState} from "react";
import {updateTransaction} from "@/app/services/actions/updateTransaction";

const TransactionPage = () => {

    const [transactions, setTransactions] = useState([]);
    const [eventSource, setEventSource] = useState(null);
    const eventSourceRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    const getTransactions = () => {
        fetch('/api/list_transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-cache",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("data is ", data); // Process the response data
                setTransactions(data);
            })
            .catch(error => {
                console.error('Error: ', error); // Handle any errors
            });
    }

    const connectEventSource = () => {
        // Close the existing connection if open
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        console.log("Connecting to event source...");
        eventSourceRef.current = new EventSource('/api/list_transactions/stream');

        eventSourceRef.current.onmessage = (event) => {
            console.log("Got new event");
            getTransactions();
        };

        eventSourceRef.current.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSourceRef.current.close();
        };

        // Clear existing timeout to avoid multiple reconnections
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }

        // Set timeout to reconnect before Heroku's timeout limit, e.g., 55 minutes
        reconnectTimeoutRef.current = setTimeout(() => {
            console.log("Reconnecting to avoid Heroku timeout...");
            connectEventSource();
        }, 2000); // Adjust as needed, slightly less than Heroku's limit
    };

    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(() => {
        connectEventSource();

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, []);

    const handleCollectedChange = (id, collected) => {
        // Update the transactions array with the new 'collected' value for the transaction with the given id

        setTransactions(transactions.map(transaction => {
            if (transaction.transaction_id === id) {
                // Return a new object with all the original transaction properties, but with 'collected' updated
                //

                console.log("transaction ", transaction.transaction_id)

                console.log(" collected? ", collected);
                console.log(" type ", typeof collected)

                if (transaction.collected != collected) {

                    let data = {
                        transactionId: transaction.transaction_id,
                        collected: collected
                    }
                    void updateTransaction(data);
                }

                return {...transaction, collected: collected};
            } else {
                return transaction; // Return the transaction unchanged if it's not the one we're updating
            }
        }));
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 2px 3px rgba(0,0,0,0.1)',
        marginTop: '20px',
    };

    const thStyle = {
        backgroundColor: '#f4f4f4',
        color: '#333',
        fontWeight: 'bold',
        padding: '10px 15px',
        border: '1px solid #ddd',
    };

    const tdStyle = {
        padding: '8px 15px',
        border: '1px solid #ddd',
        textAlign: 'left',
    };

    // const transactionsData = [{"id":4,"created_at":"2024-02-01T13:13:14.364808+00:00","transaction_id":"0J1021481X536102T","buyer_name":"Tan Kok Wee","total_amount":0.01,"quantity":1,"email":"kotan@paypal.c"},{"id":5,"created_at":"2024-02-01T13:16:13.320691+00:00","transaction_id":"9HM826387V058771W","buyer_name":"kok wee tan","total_amount":0.03,"quantity":3,"email":"kotan@paypal.c"},{"id":6,"created_at":"2024-02-01T13:44:16.293015+00:00","transaction_id":"52700826D6889874S","buyer_name":"Tan Kok Wee","total_amount":0.01,"quantity":1,"email":"kotan@paypal.c"},{"id":7,"created_at":"2024-02-01T13:44:38.795946+00:00","transaction_id":"1K0023459X9126728","buyer_name":"Tan Kok Wee","total_amount":0.02,"quantity":2,"email":"kotan@paypal.com"}];
    //
    // const generatedData = [];
    //
    // for (let i = 0; i < 50; i++) {
    //     // Clone one of the existing items and push it into the new array
    //     const randomIndex = Math.floor(Math.random() * transactionsData.length);
    //     generatedData.push({ ...transactionsData[randomIndex] });
    // }

    // Function to convert data to CSV and trigger download
    const exportToCSV = () => {
        const csvRows = [
            // CSV header
            ["Invoice ID", "Created At", "Buyer Name", "Total Amount", "Quantity", "Email"].join(','),
            // Map each transaction to a CSV row
            ...transactions.map(transaction => [
                transaction.transaction_id,
                new Date(transaction.created_at).toISOString(),
                `"${transaction.buyer_name}"`, // Wrap in quotes to handle commas
                transaction.total_amount.toFixed(2),
                transaction.quantity,
                transaction.email
            ].join(','))
        ].join('\n');

        // Create a Blob with CSV data
        const blob = new Blob([csvRows], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);
        // Create a link and trigger the download
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'transactions.csv');
        a.click();
        URL.revokeObjectURL(url);
    };


    return (
        <div className="bg-white px-4 py-8 lg:px-8 w-full h-full">
            <h1>Transactions</h1>
            <button
                style={{
                    padding: '10px',
                    marginBottom: '20px',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                }}
                onClick={exportToCSV}
            >
                Export
            </button>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>Invoice ID</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Buyer Name</th>
                    <th style={thStyle}>Total Amount</th>
                    <th style={thStyle}>Quantity</th>
                    <th style={thStyle}>Collected</th>
                    <th style={thStyle}>Created At</th>
                    <th style={thStyle}>Updated At</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.transaction_id}>
                        <td style={tdStyle}>{transaction.transaction_id}</td>
                        <td style={tdStyle}>{transaction.email}</td>
                        <td style={tdStyle}>{transaction.buyer_name}</td>
                        <td style={tdStyle}>${transaction.total_amount ? transaction.total_amount.toFixed(2) : 0}</td>
                        <td style={tdStyle}>{transaction.quantity}</td>
                        <td style={tdStyle}>
                            <input
                                type="checkbox"
                                checked={transaction.collected}
                                onChange={(e) => handleCollectedChange(transaction.transaction_id, e.target.checked)}
                                // disabled // Add this if you don't want users to change the value
                            />
                        </td>
                        <td style={tdStyle}>{new Date(transaction.created_at).toLocaleString()}</td>
                        <td style={tdStyle}>{new Date(transaction.updated_at).toLocaleString()}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}

export default TransactionPage;