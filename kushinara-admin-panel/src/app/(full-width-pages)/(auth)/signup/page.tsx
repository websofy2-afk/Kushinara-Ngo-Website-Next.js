import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Buddh Bhumi Kushinara Charitable Trust",
  description:
    "Buddha Bhumi Kushinara Charitable Trust is a non-profit organization committed to fostering holistic growth through initiatives in Culture, Education, Health, and Awareness.",
  icons: {
    icon: "/images/auth-logo.png",
  },
};
export default function SignUp() {
  return <SignUpForm />;
}
