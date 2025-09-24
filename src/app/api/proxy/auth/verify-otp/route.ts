import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
    try {
      const { phoneNumber, otp } = await req.json();
  
      // فیلد Code به جای otp
      const body = {
        phoneNumber,
        Code: otp
      };
  
      const res = await fetch(`${BASE_URL}/api/Auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      const text = await res.text();
      console.log("API verify-otp status:", res.status, "response:", text);
  
      if (!res.ok) {
        return NextResponse.json(
          { error: "Failed to verify OTP", status: res.status, text },
          { status: res.status }
        );
      }
  
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (err) {
      console.error("Fetch verify-otp Error:", err);
      return NextResponse.json({ error: "Server error verifying OTP" }, { status: 500 });
    }
  }
  