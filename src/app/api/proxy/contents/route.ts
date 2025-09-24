import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  try {
    // توکن از کوکی یا header می‌گیریم (Front-end بعد از login میفرسته)
    const token = req.headers.get("Authorization"); // مثلا "Bearer <token>"

    const res = await fetch(`${BASE_URL}/api/Content`, {
      headers: {
        Accept: "application/json",
        Authorization: token || "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch contents", status: res.status, data }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Server error fetching contents" }, { status: 500 });
  }
}
