import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "../../../../lib/mongodb";
import Donation from "../../../../../model/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    await connectDB()

   const { name, phoneNumber, email, address, refrenceNumber, amount } = await req.json();

    if (!name || !phoneNumber || !address || !amount || !refrenceNumber) {
      return NextResponse.json(
        { error: `All fields are required ` },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in paise (₹1 = 100)
      currency: "inr",
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
    });

    const transactionId = paymentIntent.id;
    const donation = await Donation.create({
      name, phoneNumber, email, address, refrenceNumber, amount, transactionId
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      transactionId: paymentIntent.id,
      paymentMethod: paymentIntent.payment_method_types[0]
    });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();
    const donations = await Donation.find().sort({ createdAt: -1 }); // latest first
    return NextResponse.json(
      { success: true, data: donations },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}



// export async function GET(req: Request) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = verifyToken(token);

//     if (!decoded) {
//       return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
//     }

//     await connectDB();
//     const donations = await Donation.find().sort({ createdAt: -1 });

//     return NextResponse.json({ success: true, data: donations }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error fetching donations:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


/*
clientSecret: paymentIntent.client_secret,
transactionId : paymentIntent.id
paymentMethod : paymentIntent.payment_method_types[0]
*/


// Payment intent --->  {
//   id: 'pi_3SH1seJoRmpxQset1rPM0y6m',
//   object: 'payment_intent',
//   amount: 70000,
//   amount_capturable: 0,
//   amount_details: { tip: {} },
//   amount_received: 0,
//   application: null,
//   application_fee_amount: null,
//   automatic_payment_methods: { allow_redirects: 'always', enabled: true },
//   canceled_at: null,
//   cancellation_reason: null,
//   capture_method: 'automatic_async',
//   client_secret: 'pi_3SH1seJoRmpxQset1rPM0y6m_secret_0NPJcfLkOMGLvZzvTIK2h1qoP',
//   confirmation_method: 'automatic',
//   created: 1760185596,
//   currency: 'inr',
//   customer: null,
//   description: null,
//   excluded_payment_method_types: null,
//   last_payment_error: null,
//   latest_charge: null,
//   livemode: false,
//   metadata: {},
//   next_action: null,
//   on_behalf_of: null,
//   payment_method: null,
//   payment_method_configuration_details: { id: 'pmc_1SGHJsJoRmpxQsetfcfGz7Aa', parent: null },
//   payment_method_options: {
//     card: {
//       installments: null,
//       mandate_options: null,
//       network: null,
//       request_three_d_secure: 'automatic'
//     },
//     link: { persistent_token: null }
//   },
//   payment_method_types: [ 'card', 'link' ],
//   processing: null,
//   receipt_email: 'websofy2@gmail.com',
//   review: null,
//   setup_future_usage: null,
//   shipping: null,
//   source: null,
//   statement_descriptor: null,
//   statement_descriptor_suffix: null,
//   status: 'requires_payment_method',
//   transfer_data: null,
//   transfer_group: null
// }