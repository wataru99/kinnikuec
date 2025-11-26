import nodemailer from "nodemailer";

// Gmail SMTP トランスポーター
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export type SendEmailParams = {
  to: string;
  subject: string;
  body: string;
};

// メール送信
export async function sendEmail({ to, subject, body }: SendEmailParams): Promise<void> {
  await transporter.sendMail({
    from: `"筋肉ショップ" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text: body,
  });
}

// 注文完了メール（クレジットカード）送信
export async function sendOrderCompleteCreditEmail(params: {
  to: string;
  customerName: string;
  orderNumber: string;
  orderDate: string;
  orderItems: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: string;
}): Promise<void> {
  const subject = `【筋肉ショップ】ご注文ありがとうございます（注文番号: ${params.orderNumber}）`;
  const body = `${params.customerName} 様

この度は筋肉ショップをご利用いただき、誠にありがとうございます。
以下の内容でご注文を承りました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ ご注文情報
━━━━━━━━━━━━━━━━━━━━━━━━━━━
注文番号: ${params.orderNumber}
注文日時: ${params.orderDate}

■ ご注文商品
${params.orderItems}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お支払い金額
━━━━━━━━━━━━━━━━━━━━━━━━━━━
小計: ¥${params.subtotal.toLocaleString()}
消費税: ¥${params.tax.toLocaleString()}
送料: ¥${params.shipping === 0 ? "0（無料）" : params.shipping.toLocaleString()}
──────────────────────────
合計: ¥${params.total.toLocaleString()}

お支払い方法: クレジットカード（決済完了）

━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お届け先
━━━━━━━━━━━━━━━━━━━━━━━━━━━
${params.shippingAddress}

━━━━━━━━━━━━━━━━━━━━━━━━━━━

商品の発送準備が整いましたら、改めてご連絡いたします。
ご不明な点がございましたら、お気軽にお問い合わせください。

今後とも筋肉ショップをよろしくお願いいたします。

──────────────────────────
筋肉ショップ
Email: information.orekin@gmail.com
──────────────────────────`;

  await sendEmail({ to: params.to, subject, body });
}

// 注文完了メール（銀行振込）送信
export async function sendOrderCompleteBankEmail(params: {
  to: string;
  customerName: string;
  orderNumber: string;
  orderDate: string;
  orderItems: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: string;
  bankName: string;
  branchName: string;
  accountType: string;
  accountNumber: string;
  accountHolder: string;
  paymentDeadline: string;
}): Promise<void> {
  const subject = `【筋肉ショップ】ご注文ありがとうございます - お振込のお願い（注文番号: ${params.orderNumber}）`;
  const body = `${params.customerName} 様

この度は筋肉ショップをご利用いただき、誠にありがとうございます。
以下の内容でご注文を承りました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ ご注文情報
━━━━━━━━━━━━━━━━━━━━━━━━━━━
注文番号: ${params.orderNumber}
注文日時: ${params.orderDate}

■ ご注文商品
${params.orderItems}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お支払い金額
━━━━━━━━━━━━━━━━━━━━━━━━━━━
小計: ¥${params.subtotal.toLocaleString()}
消費税: ¥${params.tax.toLocaleString()}
送料: ¥${params.shipping === 0 ? "0（無料）" : params.shipping.toLocaleString()}
──────────────────────────
合計: ¥${params.total.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お振込先情報
━━━━━━━━━━━━━━━━━━━━━━━━━━━
金融機関: ${params.bankName}
支店名: ${params.branchName}
口座種別: ${params.accountType}
口座番号: ${params.accountNumber}
口座名義: ${params.accountHolder}

【お振込期限】${params.paymentDeadline}

※ 振込手数料はお客様のご負担となります。
※ ご注文者名と振込名義が異なる場合は、事前にお問い合わせください。
※ お振込期限を過ぎた場合、ご注文がキャンセルとなる場合がございます。

━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お届け先
━━━━━━━━━━━━━━━━━━━━━━━━━━━
${params.shippingAddress}

━━━━━━━━━━━━━━━━━━━━━━━━━━━

ご入金確認後、商品の発送準備を開始いたします。
ご不明な点がございましたら、お気軽にお問い合わせください。

今後とも筋肉ショップをよろしくお願いいたします。

──────────────────────────
筋肉ショップ
Email: information.orekin@gmail.com
──────────────────────────`;

  await sendEmail({ to: params.to, subject, body });
}
