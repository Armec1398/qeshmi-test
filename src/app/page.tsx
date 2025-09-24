"use client";
import { useState } from "react";
import { sendOtp, verifyOtp, fetchContents } from "./lib/api";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "logged">("phone");
  const [token, setToken] = useState("");
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      await sendOtp(phone);
      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await verifyOtp(phone, otp);
      setToken(data.token); // حالا mock token یا واقعی
      setStep("logged");

      const contentsData = await fetchContents(data.token);
      setContents(contentsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === "phone") {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          onClick={handleSendOtp}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  if (step === "otp") {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          onClick={handleVerifyOtp}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  // بعد از login، صفحه Content با mock token
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Logged in! Contents</h1>
      {contents.length === 0 && <p>No contents available</p>}
      <ul className="space-y-2">
        {contents.map((c) => (
          <li key={c.id} className="border p-2 rounded shadow">
            <p className="font-bold">{c.title}</p>
            <p>{c.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
