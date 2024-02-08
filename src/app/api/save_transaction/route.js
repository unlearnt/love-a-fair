import { createClient } from '@supabase/supabase-js'

const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabase_url, supabase_key);

export async function GET() {
    // const res = await fetch('https://data.mongodb-api.com/...', {
    //     next: { revalidate: 60 }, // Revalidate every 60 seconds
    // })
    // const data = await res.json()

    // return Response.json(data)
    return new Response('Hello, Next.js!', {
        status: 200,
        // headers: { 'Set-Cookie': `token=${token.value}` },
    })
}

export async function POST(request) {
    try {
        const res = await request.json()
        console.log("res ", res);

        const { error } = await supabase
            .from('nomura_transactions')
            .insert({ transaction_id : res.transactionId, buyer_name: res.buyerName, total_amount: res.totalAmount, quantity: res.quantity, email: res.email })

    } catch (error) {
        return new Response(`Webhook error: ${error.message}`, {
            status: 400,
        })
    }

    return new Response(JSON.stringify({ msg: "success!" }), {
        status: 200,
    })
}