import Logout from "@/components/auth/Logout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Logout Page | TailAdmin - Next.js Dashboard Template",
};

export default function LogOut() {
  return <Logout/>
}