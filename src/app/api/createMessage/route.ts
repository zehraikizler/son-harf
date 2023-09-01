// import { NextApiRequest, NextApiResponse } from 'next'

import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const request = await req.json();
  const { messages } = request;
  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  const body = JSON.stringify({
    messages,
    model: "gpt-3.5-turbo",
    stream: false,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body
    })
    const data = await response.json()
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
