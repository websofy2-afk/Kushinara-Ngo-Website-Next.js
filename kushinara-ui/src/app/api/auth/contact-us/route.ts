import { NextResponse } from "next/server";
import { sendEmailWithContact } from "../../../../lib/sendEmailWithContact";

export const POST = async (req: Request) => {
    try {
        const { fullName, email, phoneNumber, date, helpMsg } = await req.json();
        await sendEmailWithContact({
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            date: date,
            helpMsg: helpMsg
        });
        return NextResponse.json({ ok: 200, message: "Contact details send successfully!" })
    } catch (error) {
        console.error("Contact details... :", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}