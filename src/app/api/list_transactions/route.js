import { createClient } from '@supabase/supabase-js'

const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabase_url, supabase_key);

export const dynamic = 'force-dynamic'

export async function GET() {

    const { data, error } = await supabase
        .from('nomura_transactions')
        .select()

    // return Response.json(data)
    return new Response(JSON.stringify(data), {
        status: 200,
        // headers: { 'Set-Cookie': `token=${token.value}` },
    })
}

