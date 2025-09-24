import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(_req: NextRequest) {
  try {
    const { phoneNumber, otp } = await _req.json();

    const body = { phoneNumber, Code: otp }; // توجه: فیلد Code برای API اصلی است

    const res = await fetch(`${BASE_URL}/api/Auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    console.log("API verify-otp status:", res.status, "response:", text);

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to verify OTP", status: res.status, text }, { status: res.status });
    }

    const data = JSON.parse(text);
    // mock token اگر token واقعی null باشد
    const token = data.data.token ?? "mock-token-for-testing";
    return NextResponse.json({ ...data, data: { ...data.data, token } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error verifying OTP" }, { status: 500 });
  }
}
