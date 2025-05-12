
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  const clientInfo = {
    userAgent: req.headers.get('user-agent'),
    ipAddress: req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')
  }

  return new Response(JSON.stringify(clientInfo), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
})
