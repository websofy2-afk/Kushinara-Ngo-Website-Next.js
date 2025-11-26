import VerifyOtp from "@/components/auth/VerifyOtp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Otp Page | Kushinara Dashboard",
};

export default function SignUp() {
  return <VerifyOtp/>
}
