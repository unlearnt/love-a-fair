'use server'

export async function addTransaction(data) {

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiUrl = `${baseUrl}/api/save_transaction`;

    console.log("hello fetching apiUrl ", apiUrl)
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("data is ", data.msg); // Process the response data
        })
        .catch(error => {
            console.error('Error: ', error); // Handle any errors
        });

}