import { NextRequest, NextResponse } from "next/server";
import {
  sendOrderCompleteCreditEmail,
  sendOrderCompleteBankEmail,
} from "@/lib/services/emailService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    switch (type) {
      case "order_complete_credit":
        await sendOrderCompleteCreditEmail(data);
        break;
      case "order_complete_bank":
        await sendOrderCompleteBankEmail(data);
        break;
      default:
        return NextResponse.json(
          { error: "Unknown email type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("メール送信エラー:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
