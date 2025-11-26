import { Document } from "mongoose";

export interface Donation extends Document {
    name: string;
    phoneNumber: string,
    email: string;
    address: string;
    refrenceNumber: string;
    amount: number;
    transactionId: string;
    isRecurring: boolean;
}