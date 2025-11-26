"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Tooltip from "../common/Tooltip";
import { KeySquare, Loader, MoveLeft, RotateCcwKey, Send } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [tooltip, setTooltip] = useState<{ message: string; type: any } | null>(
        null
    );

    const showTooltip = (
        message: string,
        type: "success" | "error" | "info" = "info"
    ) => {
        setTooltip({ message, type });
        setTimeout(() => setTooltip(null), 3000);
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) {
            setTimeout(() => {
                setStep(2)
                setLoading(false)
            }, 2000)
            showTooltip(data.message, "success");
        } else {
            showTooltip(data.message, "error");
            setLoading(false)
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaValue) {
            showTooltip("Please verify the CAPTCHA before sign in.", "error");
            return;
        }
        setLoading(true)
        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp, newPassword, confirmPassword, captcha: captchaValue }),
        });
        const data = await res.json();
        if (res.ok) {
            setConfirmPassword(""); setTimeout(() => {
                router.push("/signin");
                setLoading(false)
            }, 2000)
            showTooltip(data.message, "success");
            setEmail("");
            setOtp("");
            setNewPassword("");
        } else {
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
                            {step === 1 ? "Forgot Password" : "Verify OTP & Reset Password"}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {step === 1 ? "Enter your email to send otp!" : "Enter password and varify otp to reset to your password!"}
                        </p>
                    </div>
                    <div>
                        {
                            step === 1 && (
                                <form onSubmit={handleSendOtp}>
                                    <div className="space-y-6">
                                        <div>
                                            <Label>
                                                Email <span className="text-error-500">*</span>{" "}
                                            </Label>
                                            <Input placeholder="Enter your email" type="email" value={email}
                                                onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                        <div>
                                        </div>
                                        <div>
                                            <Button type="submit" className="w-full" size="sm">
                                                {
                                                    loading ? <>
                                                        Sending...
                                                        <Loader className="animate-spin w-5 h-5" />
                                                    </> :
                                                        <>
                                                            Send OTP
                                                            <Send className="w-5 h-5" />
                                                        </>
                                                }
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between">

                                            <Link
                                                href="/signin"
                                                className="text-sm flex text-brand-500 hover:text-brand-600"
                                            >
                                                <MoveLeft className="mr-2" /> <span>Back to sign in?</span>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            )
                        }

                        {
                            step === 2 && (
                                <form onSubmit={handleResetPassword}>
                                    <div className="space-y-6">

                                        <div>
                                            <Label>
                                                New Password <span className="text-error-500">*</span>{" "}
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your new password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
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

                                        <div>
                                            <Label>
                                                Confirm Password <span className="text-error-500">*</span>{" "}
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter confirm password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
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

                                        <div>
                                            <Label>
                                                OTP <span className="text-error-500">*</span>{" "}
                                            </Label>
                                            <Input placeholder="Enter otp to send your email" required type="text" value={otp}
                                                onChange={(e) => setOtp(e.target.value)} />
                                        </div>
                                        <div className="flex">
                                            <ReCAPTCHA
                                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                                onChange={(value) => setCaptchaValue(value)}
                                            />
                                        </div>
                                        <div>
                                            <Button type="submit" className="w-full" size="sm">
                                                {
                                                    loading ? <>
                                                        Processing...
                                                        <RotateCcwKey className="animate-spin w-5 h-5" />
                                                    </> :
                                                        <>
                                                            Reset Password
                                                            <KeySquare className="w-5 h-5" />
                                                        </>
                                                }
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
