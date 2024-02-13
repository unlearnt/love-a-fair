import {createClient} from '@supabase/supabase-js'

const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabase_url, supabase_key);

export const dynamic = 'force-dynamic'


export async function GET() {

    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    const handleChanges = (payload) => {
        console.log("Changed received! ", payload)
        writer.write(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
    }
    supabase
        .channel('todos')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'nomura_transactions' }, handleChanges)
        .subscribe()

    return new Response(responseStream.readable, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/event-stream; charset=utf-8",
            Connection: "keep-alive",
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",
            "Content-Encoding": "none",
        },
    });

}
