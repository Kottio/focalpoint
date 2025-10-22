"use client"


import { useState, useEffect } from "react"
import { authClient, useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"


export default function SignInPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState<string>("")
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (!isPending && session) {
      router.push('/map');
    }
  }, [session, isPending, router]);

  // Show nothing while checking session
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Don't render sign-in form if already logged in
  if (session) {
    return null;
  }



  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim()) {
      setError("Please enter your Email!")
      return
    }
    setLoading(true)
    try {
      const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
        email: email.trim(),
        type: "sign-in",
      })
      if (sendError) {
        setError(sendError.message || "Failed to send Code. Please try again.");
        return;
      }
      setStep("otp")
    }
    catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!otp.trim()) {
      setError("Please enter the OTP code.");
      return;
    }
    setLoading(true);
    try {
      const { error: verifyError } = await authClient.signIn.emailOtp({
        email: email.trim(),
        otp: otp.trim(),
      });

      if (verifyError) {
        setError(verifyError.message || "Invalid or expired OTP.");
        setLoading(false);
        return;
      }

      // Wait a bit for Safari to properly set the session cookie
      await new Promise(resolve => setTimeout(resolve, 500));

      // Force a full page reload to ensure session is loaded (Safari fix)
      window.location.href = "/map";
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  const handleResendOTP = async () => {
    setOtp("")
    setError(null)
    setLoading(true)
    try {
      const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
        email: email.trim(),
        type: "sign-in",
      })
      if (sendError) {
        setError(sendError.message || "Failed to send Code. Please try again.");
        return;
      }
    } catch {
      setError("Network Error. Please Try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh fixed flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        {step === "email" ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-center">Sign In</h2>
              <p className="mt-2 text-center text-gray-600">
                Enter your email to receive a verification code
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-center">Enter Code</h2>
              <p className="mt-2 text-center text-gray-600">
                We sent a 6-digit code to <strong>{email}</strong>
              </p>
              <p className="text-center text-sm text-gray-500 mt-1">
                Code expires in 60 seconds
              </p>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Verification code
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-center text-2xl tracking-widest focus:outline-none focus:ring-blue-500
  focus:border-blue-500"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
  focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Resend Code
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setError(null);
                  }}
                  disabled={loading}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2
  focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Change Email
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );

}