import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  try {
    // بدست آوردن body و تایپ‌دهی
    const body: { phoneNumber: string } = await req.json();

    const res = await fetch(`${BASE_URL}/api/Auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // اگر نیاز به Authorization بود، این خط را فعال کنید
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("API POST /send-otp Error:", res.status, data);
      return NextResponse.json(
        { error: "API returned error", status: res.status, data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (_err: unknown) {
    console.error("Fetch POST /send-otp Error:", _err);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
