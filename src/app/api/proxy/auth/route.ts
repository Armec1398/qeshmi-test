import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN; // اگر نیاز بود، می‌تونی هدر اضافه کنی

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // { phoneNumber: "string" }

    const res = await fetch(`${BASE_URL}/api/Auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${TOKEN}`, // اگر نیاز API هست، این خط را فعال کن
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("API POST /send-otp Error:", res.status, data);
      return NextResponse.json({ error: "API returned error", status: res.status, data }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Fetch POST /send-otp Error:", err);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
