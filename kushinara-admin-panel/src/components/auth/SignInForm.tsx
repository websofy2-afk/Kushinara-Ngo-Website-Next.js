"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Tooltip from "../common/Tooltip";
import ReCAPTCHA from "react-google-recaptcha";
import { Loader, Send } from "lucide-react";

export default function SignInForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tooltip, setTooltip] = useState<{ message: string; type: any } | null>(
    null
  );
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const showTooltip = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setTooltip({ message, type });
    setTimeout(() => setTooltip(null), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaValue) {
      showTooltip("Please verify the CAPTCHA before sign in.", "error");
      return;
    }
    setLoading(true)
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...form, captcha: captchaValue}),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("userEmail", data.user.email);
      setTimeout(() => {
        router.push("/dashboard");
        setLoading(false)
      }, 2000)
      showTooltip(data.message, "success");
    }
    else {
      showTooltip(data.message, "error");
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      {tooltip && <Tooltip message={tooltip.message} type={tooltip.type} />}
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@gmail.com" type="email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">

                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="flex">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(value) => setCaptchaValue(value)}
                  />
                </div>
                <div>
                  <Button type="submit" className="w-full" size="sm">
                    {loading ? (
                      <>
                        Sign in...
                        <Loader className="animate-spin w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Sign in
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>


            {/* Sign up page link */}
            {/* <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 sm:text-start">
                Don&apos;t have an account? {" "}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600"
                >
                  Sign Up
                </Link>
              </p>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
}
