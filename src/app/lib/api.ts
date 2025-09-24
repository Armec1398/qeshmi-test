export interface VerifyOtpResponse {
  isSuccess: boolean;
  data: {
    token: string | null;
    refreshToken: string | null;
    hasProfile: boolean;
    userId: number;
  };
  metaData: {
    message: string;
    appStatusCode: number;
  };
}

export interface Content {
  id: number;
  title: string;
  description: string;
}

export async function sendOtp(phoneNumber: string) {
  const res = await fetch("/api/proxy/auth/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber }),
  });
  if (!res.ok) throw new Error("Failed to send OTP");
  return res.json();
}

export async function verifyOtp(phoneNumber: string, otp: string): Promise<VerifyOtpResponse> {
  const res = await fetch("/api/proxy/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber, otp }),
  });
  if (!res.ok) throw new Error("Failed to verify OTP");

  const data: VerifyOtpResponse = await res.json();

  // اگر token واقعی null بود، یک mock token تستی بده
  return { ...data, data: { ...data.data, token: data.data.token ?? "mock-token-for-testing" } };
}

export async function fetchContents(token: string): Promise<Content[]> {
  const res = await fetch("/api/proxy/contents", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch contents");
  return res.json();
}
