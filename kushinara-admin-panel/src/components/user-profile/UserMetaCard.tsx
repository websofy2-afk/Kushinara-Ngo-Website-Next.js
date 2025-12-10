"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Image from "next/image";
import { CircleCheckBig, Key, Loader, SquarePen } from "lucide-react";
import { Oval } from "react-loader-spinner";
import Tooltip from "../common/Tooltip";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  profileImage?: string;
}

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tooltip, setTooltip] = useState<{ message: string; type: any } | null>(
    null
  );
  const [updateCredentials, setUpdateCredentials] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const fetchUser = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) return;
      const res = await fetch(`/api/auth/user-profile/get-user?email=${email}`);
      const data = await res.json();
      const u = {
        firstName: data.user?.firstName ?? "",
        lastName: data.user?.lastName ?? "",
        email: data.user?.email ?? "",
        phone: data.user?.phone ?? "",
        bio: data.user?.bio ?? "",
        country: data.user?.country ?? "",
        city: data.user?.city ?? "",
        postalCode: data.user?.postalCode ?? "",
        profileImage: data.user?.profileImage ?? "",
      } as User;
      setUser(u);
      setFormData(u);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        bio: user.bio ?? "",
        country: user.country ?? "",
        city: user.city ?? "",
        postalCode: user.postalCode ?? "",
      });
    }
  }, [user]);

  const updateProfile = () => {
    if (user) {
      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        bio: user.bio ?? "",
        country: user.country ?? "",
        city: user.city ?? "",
        postalCode: user.postalCode ?? "",
      });
    }
    setMode("profileUpdate");
    openModal();
  };
  const updatePassword = () => {
    setMode("passwordUpdate");
    openModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value } as User));
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveProfile = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const userEmail = localStorage.getItem("userEmail");
    const updateData = {
      email: userEmail,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      bio: formData.bio,
      country: formData.country,
      city: formData.city,
      postalCode: formData.postalCode,
    };


    try {
      const res = await fetch("/api/auth/user-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      if (res.ok) {
        setTimeout(() => {
          showTooltip(data.message, "success");
        }, 1000)
      } else {
        showTooltip(data.error || "Update failed", "error");
      }
    } catch (e) {
      console.log("Internal Server Error ", e)
      showTooltip("Internal Server Error", "error");
    } finally {
      setTimeout(() => {
        closeModal();
      }, 1000)
      fetchUser();
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePasswordChange = (e: any) => {
    setUpdateCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSavePassword = async (e: any) => {
    e.preventDefault();

    if (!captchaValue) {
      showTooltip("Please verify the CAPTCHA before sign in.", "error");
      return;
    }
    setLoading(true)
    if (!updateCredentials.oldPassword || !updateCredentials.newPassword || !updateCredentials.confirmPassword) {
      setLoading(false);
      return showTooltip("All fields are required", "error");
    }

    if (updateCredentials.newPassword !== updateCredentials.confirmPassword) {
      setLoading(false);
      return showTooltip("New and Confirm Password do not match", "error");
    }

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updateCredentials, captcha: captchaValue }),
      });
      const data = await res.json();
      if (res.ok) {
        setTimeout(() => {
          showTooltip(data.message, "success");
        }, 1000)
        router.push("/logout")
      } else {
        showTooltip(data.message || "Something went wrong", "error");
      }
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error) {
      console.log("Internal Server Error ", error)
      showTooltip("Internal Server Error", "error");
    } finally {
      setTimeout(() => {
        closeModal();
      }, 1000)
      setUpdateCredentials({ ...updateCredentials, oldPassword: "", newPassword: "", confirmPassword: "" });
      fetchUser();
      setLoading(false);
    }
  };

  const showTooltip = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setTooltip({ message, type });
    setTimeout(() => setTooltip(null), 3000);
  };

  if (!user) return <div className="flex items-center justify-center min-h-64 bg-gray-50">
    <Oval
      visible={true}
      height={80}
      width={80}
      color="#2563eb"
      secondaryColor="#93c5fd"
    />
  </div>
  return (
    <>
      {tooltip && <Tooltip message={tooltip.message} type={tooltip.type} />}
      <div className="p-5 border border-gray-200 rounded-2xl lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full">
              <Image width={80} height={80} src={user.profileImage || "/images/user/user.jpg"} alt="user" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-sm text-gray-500">{user.bio || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 justify-center">
            <button
              onClick={updateProfile}
              className="flex w-full items-center cursor-pointer justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto"
            >
              <SquarePen size={15} />
              Edit
            </button>
            <button
              onClick={updatePassword}
              className="flex w-full items-center cursor-pointer justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-40"
            >
              <Key size={15} />
              Reset Password
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || "—"}</p>
          <p><strong>Country:</strong> {user.country || "—"}</p>
          <p><strong>City/State:</strong> {user.city || "—"}</p>
          <p><strong>Postal Code:</strong> {user.postalCode || "—"}</p>
        </div>
      </div>
      {mode === "profileUpdate" && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] m-4 max-h-[90vh] overflow-y-auto"
        >
          <form
            onSubmit={handleSaveProfile}
            className="w-full bg-white border border-gray-300 rounded-3xl p-6 lg:p-10"
          >
            <h4 className="text-2xl font-semibold mb-4 text-gray-800">Edit Profile</h4>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>First Name</Label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden"
                />
              </div>

              <div>
                <Label>Last Name</Label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden"
                />
              </div>

              <div>
                <Label>Email</Label>
                <input
                  name="email"
                  value={formData.email}
                  disabled
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden"
                />
              </div>

              <div>
                <Label>Phone</Label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden"
                />
              </div>

              <div className="col-span-2">
                <Label>Bio</Label>
                <textarea
                  rows={4}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs resize-none placeholder:text-gray-400 focus:outline-hidden"
                />
              </div>

              <div>
                <Label>Country</Label>
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden"
                />
              </div>

              <div>
                <Label>City/State</Label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden"
                />
              </div>

              <div>
                <Label>Postal Code</Label>
                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>

              {loading ? (
                <Button type="submit">
                  Saving...
                  <Loader className="animate-spin w-5 h-5" />
                </Button>
              ) : (
                <Button type="submit">
                  Save Changes
                  <CircleCheckBig className="w-5 h-5" />
                </Button>
              )}
            </div>
          </form>
        </Modal>

      )}

      {/* Password Update Modal */}
      {mode === "passwordUpdate" && (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <form onSubmit={handleSavePassword} className="w-full max-w-[700px] bg-white border border-gray-300 rounded-3xl p-6 lg:p-10">
            <h4 className="text-2xl font-semibold mb-4 text-gray-800">Reset Password</h4>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Old Password</Label>
                <input type="password" name="oldPassword" value={updateCredentials.oldPassword} onChange={handlePasswordChange} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden" />
              </div>
              <div>
                <Label>New Password</Label>
                <input type="password" name="newPassword" value={updateCredentials.newPassword} onChange={handlePasswordChange} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden" />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <input type="password" name="confirmPassword" value={updateCredentials.confirmPassword} onChange={handlePasswordChange} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden" />
              </div>
              <div>
                <div className="flex">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(value) => setCaptchaValue(value)}
                  />
                </div>
              </div>

            </div>

            <div className="flex justify-between items-center gap-3 mt-6">
              <p className="text-sm text-red-500 w-88"> <span className="font-bold">Note* :</span> You will be logged out of the admin panel once you update your password.</p>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                {
                  loading ? <><Button type="submit">Saving... <Loader className="animate-spin w-5 h-5" /></Button></> :
                    <><Button type="submit">Save Changes <CircleCheckBig className="w-5 h-5" /></Button> </>
                }
              </div>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}


