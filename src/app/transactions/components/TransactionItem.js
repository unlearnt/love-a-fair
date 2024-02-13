function TransactionItem({ transaction }) {
    return (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h2>Transaction: {transaction.transaction_id}</h2>
            <p><strong>Buyer:</strong> {transaction.buyer_name}</p>
            <p><strong>Email:</strong> {transaction.email}</p>
            <p><strong>Date:</strong> {new Date(transaction.created_at).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ${transaction.total_amount}</p>
            <p><strong>Quantity:</strong> {transaction.quantity}</p>
        </div>
    );
}

export default TransactionItem;