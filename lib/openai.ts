import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateThreatSummary(threats: any[]): Promise<string> {
  try {
    if (!threats.length) {
      return "No threats detected in the current monitoring period. Your systems appear secure."
    }

    const prompt = `
      You are an expert cybersecurity AI assistant for ShadowStack.
      Analyze these ${threats.length} threats detected in our system:
      ${JSON.stringify(threats.slice(0, 10))} 
      
      Provide a concise 2-paragraph summary:
      1. First paragraph should be a high-level overview of the current threat landscape
      2. Second paragraph should highlight the most critical threats and recommended actions
      
      Use a professional, security expert tone. Don't introduce yourself or add explanations outside the summary.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a cybersecurity threat analysis expert working for ShadowStack." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
      temperature: 0.5,
    })

    return completion.choices[0].message.content || "Unable to analyze threats at this time."
  } catch (error) {
    console.error("Error generating AI threat summary:", error)
    return "AI analysis temporarily unavailable. Please check back shortly."
  }
}
