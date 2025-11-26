"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LoaderCircle, Send } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactForm = () => {

  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    date: "",
    helpMsg: ""
  })

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setContactData({
    ...contactData, [e.target.name]: e.target.value
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setContactData(({ ...contactData, [e.target.name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !contactData.fullName.trim() ||
      !contactData.email.trim() ||
      !contactData.phoneNumber.trim() ||
      !contactData.date.trim() ||
      !contactData.helpMsg.trim()
    ) {
      setMessage("All fields are required.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("api/auth/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      });
      const data = await res.json();
      if (data.ok) {
        setMessage(
          `Thank you for reaching out. Our team will contact you as soon as possible.`
        );
        setContactData({
          fullName: "",
          email: "",
          phoneNumber: "",
          date: "",
          helpMsg: ""
        });
      }
    } catch (error) {
      console.error(error);
      setMessage(`We couldn’t send your request. Please check your details and try again, or contact our team directly for assistance.`);
    } finally {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
      setLoading(false);
    }
  }

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <>
      <section className="pb-8">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">
            <div className="lg:col-span-6 lg:order-1 order-2">
              <h2 className="max-w-[35rem] text-4xl  leading-tight font-bold mb-9 text-title">Get in Touch with Buddh Bhumi Kushinara Charitable Trust</h2>
              <form onSubmit={handleSubmit} className="flex flex-wrap w-full m-auto justify-between">

                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="FullName" className="pb-3 inline-block text-base">Full Name*</label>
                    <input id="FullName"
                      className="w-full text-base bg-white px-4 rounded-lg py-2.5 border-border border-solid border transition-all duration-500 focus:border-primary focus:border-solid focus:outline-0"
                      type="text"
                      required
                      name="fullName"
                      value={contactData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="phoneNumber" className="pb-3 inline-block text-base">Phone Number*</label>
                    <input id="phoneNumber"
                      type="tel"
                      name="phoneNumber"
                      className="w-full text-base bg-white px-4 rounded-lg py-2.5 border-border border-solid border transition-all duration-500 focus:border-primary focus:border-solid focus:outline-0"
                      onChange={handlePhoneChange}
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                      maxLength={10}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>


                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="email" className="pb-3 inline-block text-base">Email address*</label>
                    <input id="email"
                      type="email"
                      className="w-full text-base bg-white px-4 rounded-lg py-2.5 border-border border-solid border transition-all duration-500 focus:border-primary  focus:border-solid focus:outline-0"
                      required
                      name="email"
                      value={contactData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="date" className="pb-3 inline-block text-base">Date*</label>
                    <input id="date"
                      className="w-full text-base bg-white px-4 rounded-lg py-2.5 border-border border-solid border transition-all duration-500 focus:border-primary  focus:border-solid focus:outline-0"
                      type="date"
                      required
                      name="date"
                      value={contactData.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="helpMesssage" className="pb-3 inline-block text-base">How can we help you?*</label>
                    <textarea
                      id="helpMesssage"
                      placeholder="How can we help you?"
                      className="w-full resize-none text-base bg-white px-4 rounded-lg py-2.5 border-border border-solid border transition-all duration-500 focus:border-primary  focus:border-solid focus:outline-0"
                      required
                      rows={3}
                      name="helpMsg"
                      value={contactData.helpMsg}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mx-0 my-2.5  flex items-center justify-center w-full">
                  <button className="bg-error cursor-pointer rounded-lg text-white py-4 px-8 mt-4 inline-block hover:from-transparent hover:to-transparent hover:bg-error/90 border " type="submit"
                    disabled={loading}
                  >
                    {
                      loading ?
                        (
                          <div className="flex justify-center items-center gap-4">
                            Processing...
                            <LoaderCircle className="animate-spin w-5 h-5" />
                          </div>

                        ) : (
                          <div className="flex justify-center items-center gap-4">
                            Submit Now
                            <Send className="w-5 h-5" />
                          </div>
                        )
                    }
                  </button>
                </div>
              </form>
            </div>
            <div className="hidden sm:block lg:col-span-6 lg:order-2 order-1">
              <Image
                src="/images/contact-page/contact.jpg"
                alt="Contact"
                width={1000}
                height={100}
                quality={100}
                className="bg-no-repeat bg-contain rounded-2xl border-primary border-1 h-[35rem]"
              />
            </div>
          </div>
          {showPopup && (
            <div
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-easing="ease-in-out"
              className={`fixed top-42 right-10 ${message === "All fields are required."
                ? "bg-red-500"
                : "bg-green-500"
                } text-white px-6 py-3 rounded-xl shadow-lg`}
            >
              {message}
            </div>
          )}

        </div >
      </section >
    </>
  );
};

export default ContactForm;
