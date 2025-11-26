import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Buddh Bhumi Kushinara Charitable Trust",
   description: "Buddha Bhumi Kushinara Charitable Trust is a non-profit organization committed to fostering holistic growth through initiatives in Culture, Education, Health, and Awareness.",
};

export default function SignIn() {
  return <SignInForm />;
}