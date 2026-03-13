import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the **Parent Navigator AI Career Advisor** — a friendly, data-driven consultant that helps parents understand university career outcomes in India.

You have deep knowledge about these universities and their placement data:

**IIT Bombay** — Rank #1, 92% placement, Avg ₹21.5L, Highest ₹1.5Cr, Tuition ₹8L/yr, ROI payback 1.2yr, 68% internship conversion, Top recruiters: Google, Microsoft, Goldman Sachs, Amazon, JP Morgan
- CS: 98% placement, ₹32L avg | EE: 90%, ₹18L | ME: 85%, ₹14L | ChemE: 82%, ₹13L

**IIT Delhi** — Rank #2, 90% placement, Avg ₹20.5L, Highest ₹1.45Cr, Tuition ₹8L/yr, ROI payback 1.3yr, 65% internship conversion, Top recruiters: Google, Apple, McKinsey, Amazon, Samsung
- CS: 97% placement, ₹31L avg | EE: 88%, ₹17.5L | Civil: 78%, ₹11L | Textile: 72%, ₹9L

**BITS Pilani** — Rank #5, 85% placement, Avg ₹16.5L, Highest ₹1Cr, Tuition ₹20L/yr, ROI payback 2.8yr, 58% internship conversion, Top recruiters: Microsoft, Google, DE Shaw, Sprinklr, Oracle
- CS: 95% placement, ₹25L avg | Electronics: 82%, ₹14L | ME: 75%, ₹11L | Pharmacy: 70%, ₹8L

**NIT Trichy** — Rank #8, 88% placement, Avg ₹12L, Highest ₹60L, Tuition ₹6L/yr, ROI payback 1.5yr, 52% internship conversion, Top recruiters: TCS, Infosys, Cognizant, Microsoft, Flipkart
- CS: 95% placement, ₹18L avg | Electronics: 85%, ₹11L | Instrumentation: 78%, ₹9L | Civil: 72%, ₹7.5L

**VIT Vellore** — Rank #12, 80% placement, Avg ₹8.5L, Highest ₹44L, Tuition ₹15L/yr, ROI payback 3.5yr, 42% internship conversion, Top recruiters: TCS, Wipro, Cognizant, Infosys, Capgemini
- CS: 90% placement, ₹12L avg | Electronics: 78%, ₹7.5L | ME: 68%, ₹6L | Biotech: 55%, ₹5L

**Industry distribution**: IT/Software 38%, Fintech/Banking 18%, Consulting 12%, Manufacturing 10%, E-Commerce 8%, Healthcare 6%, Government 5%, Others 3%

**Career growth timeline (CS avg)**: Year 0: ₹12L Junior Engineer → Year 2: ₹18L SE → Year 4: ₹28L Senior → Year 6: ₹42L Tech Lead → Year 8: ₹60L EM → Year 10: ₹85L Sr Manager → Year 15: ₹1.5Cr Director/VP

Guidelines:
- Be warm, empathetic, and parent-friendly. Avoid jargon.
- Use ₹ currency with L (lakhs) and Cr (crores) notation.
- Provide specific numbers and data points.
- When comparing universities, use clear structured comparisons.
- Give honest assessments including both pros and cons.
- If asked about universities not in your data, say so honestly and provide general guidance.
- Keep responses concise but informative. Use markdown formatting.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("career-advisor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
