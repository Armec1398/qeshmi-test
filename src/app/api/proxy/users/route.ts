import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${BASE_URL}/api/Users`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API GET /Users Error:", res.status, text);
      return NextResponse.json({ error: "API returned error", status: res.status, text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Fetch GET /Users Error:", err);
    return NextResponse.json({ error: "Failed to fetch from server" }, { status: 500 });
  }
}
