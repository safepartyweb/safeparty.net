import connectMongo from "@/lib/db";
import nodemailer from 'nodemailer'
import { NextResponse } from "next/server";




//get all products
export async function GET() {
  await connectMongo();
  return Response.json({ message: "Success!", products:allProducts }, { status: 200 });
}

//create payment
export async function POST(req) {
  await connectMongo();
  const reqBody = await req.json();
  // console.log("Request Data", reqBody);

  const {email, price_amount, price_currency, order_id, payment_method, discount } = reqBody;

  console.log("Payment Data:",email, price_amount, price_currency, order_id, payment_method,discount )
  

  if(payment_method == 'crypto'){
    
    try {
      const response = await fetch('https://api.nowpayments.io/v1/invoice', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NOWPAYMENTS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_amount,
          price_currency,
          order_id,
          success_url: 'http://localhost:3000/payment-success',
          cancel_url: 'http://localhost:3000/payment-cancel',
        }),
      });
      
  
      const data = await response.json();
      //res.status(200).json(data); Returns { invoice_url: 'https://...' }
      return Response.json({ message: "Success!", data }, { status: 200 })
    } catch (error) {
      return Response.json({ message: "Failed!", }, { status: 500 })
    }
  }


  if(payment_method == 'interac'){
    console.log("Interac payment initiated!")

      try {

        // const emails = ['topconstruction68@proton.me','kkmarketing12@proton.me','wwmarketing68@protonmail.com','greenconstruction55@proton.me'];
        const emails = ['mylashgirl@proton.me','theglamgoddess@proton.me','rawbeauty@proton.me'];
        const randomEmail = emails[Math.floor(Math.random() * emails.length)]
  
        // Email content
        const subject = `Your Order #${order_id} - Payment Instructions`
        
        /*
        const html = `
          <p>Thank you for your order!</p>
          <p>Please send an Interac e-Transfer of <strong>$${price_amount}</strong> to the following email:</p>
          <h3>${randomEmail}</h3>
          <p>Use your Order ID <strong>${order_id}</strong> as the message/reference.</p>

          <p>Save our contact details as
          * Name : Hair Products or Beauty Products 
          * Email : ${randomEmail}
          * Note Order number - ${order_id}
          ${ discount ? 'Promo code : Save20' : '' }
          
          Warning : All illegal mentions will result in your account being banned.</p>
          <p>We'll process your order once the payment is received.</p>
        `
        */

        const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Order Payment Instructions</title>
          </head>
      
          <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, Helvetica, sans-serif; color:#222222;">
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="background-color:#f4f4f4; padding:30px 15px;"
            >
              <tr>
                <td align="center">
                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="max-width:620px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.08);"
                  >
                    <!-- Header -->
                    <tr>
                      <td
                        style="background-color:#111111; padding:28px 30px; text-align:center;"
                      >
                        <h1
                          style="margin:0; color:#ffffff; font-size:25px; line-height:1.3;"
                        >
                          Thank You for Your Order
                        </h1>
      
                        <p
                          style="margin:8px 0 0; color:#dddddd; font-size:15px;"
                        >
                          Your order has been received and is awaiting payment.
                        </p>
                      </td>
                    </tr>
      
                    <!-- Main content -->
                    <tr>
                      <td style="padding:32px 30px;">
                        <p
                          style="margin:0 0 20px; font-size:16px; line-height:1.7;"
                        >
                          Please send an Interac e-Transfer using the payment details
                          below. Your order will be processed once the payment has
                          been received and confirmed.
                        </p>
      
                        <!-- Payment amount -->
                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="margin-bottom:22px; background-color:#f8f8f8; border:1px solid #e5e5e5; border-radius:8px;"
                        >
                          <tr>
                            <td style="padding:20px;">
                              <p
                                style="margin:0 0 6px; color:#666666; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:0.5px;"
                              >
                                Payment Amount
                              </p>
      
                              <p
                                style="margin:0; color:#111111; font-size:30px; font-weight:bold;"
                              >
                                $${price_amount}
                              </p>
                            </td>
                          </tr>
                        </table>
      
                        <!-- Transfer details -->
                        <h2
                          style="margin:0 0 15px; color:#111111; font-size:20px;"
                        >
                          Interac e-Transfer Details
                        </h2>
      
                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="border-collapse:collapse; margin-bottom:25px;"
                        >
                          <tr>
                            <td
                              style="padding:12px 10px; border-bottom:1px solid #eeeeee; color:#666666; font-size:14px; width:35%;"
                            >
                              Recipient name
                            </td>
      
                            <td
                              style="padding:12px 10px; border-bottom:1px solid #eeeeee; color:#111111; font-size:14px; font-weight:bold;"
                            >
                              Hair Products or Beauty Products
                            </td>
                          </tr>
      
                          <tr>
                            <td
                              style="padding:12px 10px; border-bottom:1px solid #eeeeee; color:#666666; font-size:14px;"
                            >
                              Recipient email
                            </td>
      
                            <td
                              style="padding:12px 10px; border-bottom:1px solid #eeeeee; font-size:14px; font-weight:bold;"
                            >
                              <a
                                href="mailto:${randomEmail}"
                                style="color:#111111; text-decoration:none;"
                              >
                                ${randomEmail}
                              </a>
                            </td>
                          </tr>
      
                          <tr>
                            <td
                              style="padding:12px 10px; border-bottom:1px solid #eeeeee; color:#666666; font-size:14px;"
                            >
                              Order ID
                            </td>
      
                            <td
                              style="padding:12px 10px; border-bottom:1px solid #eeeeee; color:#111111; font-size:14px; font-weight:bold;"
                            >
                              ${order_id}
                            </td>
                          </tr>
      
                          <tr>
                            <td
                              style="padding:12px 10px; color:#666666; font-size:14px;"
                            >
                              Message / Reference
                            </td>
      
                            <td
                              style="padding:12px 10px; color:#111111; font-size:14px; font-weight:bold;"
                            >
                              ${order_id}
                            </td>
                          </tr>
      
                          ${
                            discount
                              ? `
                                <tr>
                                  <td
                                    style="padding:12px 10px; border-top:1px solid #eeeeee; color:#666666; font-size:14px;"
                                  >
                                    Promotion
                                  </td>
      
                                  <td
                                    style="padding:12px 10px; border-top:1px solid #eeeeee; color:#111111; font-size:14px; font-weight:bold;"
                                  >
                                    Save20
                                  </td>
                                </tr>
                              `
                              : ""
                          }
                        </table>
      
                        <!-- Important instruction -->
                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="margin-bottom:24px; background-color:#fff8e6; border-left:4px solid #e6a700;"
                        >
                          <tr>
                            <td style="padding:16px 18px;">
                              <p
                                style="margin:0 0 6px; color:#7a5200; font-size:15px; font-weight:bold;"
                              >
                                Important
                              </p>
      
                              <p
                                style="margin:0; color:#6b4b00; font-size:14px; line-height:1.6;"
                              >
                                Enter only your order ID
                                <strong>${order_id}</strong> in the transfer message or
                                reference field. Do not include any prohibited,
                                offensive, or illegal wording. All illegal mentions will result in your account being banned.
                              </p>
                            </td>
                          </tr>
                        </table>
      
                        <p
                          style="margin:0 0 12px; font-size:15px; line-height:1.7;"
                        >
                          We recommend saving the recipient name and email address
                          before completing the transfer. 
                        </p>
      
                        <p
                          style="margin:0; font-size:15px; line-height:1.7;"
                        >
                          Once payment is confirmed, we will begin processing your
                          order.
                        </p>
                      </td>
                    </tr>
      
                    <!-- Footer -->
                    <tr>
                      <td
                        style="background-color:#f8f8f8; padding:22px 30px; text-align:center; border-top:1px solid #eeeeee;"
                      >
                        <p
                          style="margin:0; color:#777777; font-size:12px; line-height:1.6;"
                        >
                          This is an automated payment instruction email. Please keep
                          it for your records.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;


  
        // Send email
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        })
        console.log("Customer Email:", email)
  
        await transporter.sendMail({
          from: `"Safe Party" <${process.env.EMAIL_USER}>`,
          to: email,
          // to: 'mahmud.online11@gmail.com',
          subject,
          html,
        })
  
        return NextResponse.json({ message: 'Payment instructions sent', email: randomEmail })        
        

      } catch (error) {
        
        console.error(error)
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 })


      }



  




  }
  

  



  //return Response.json({ message: "Payment backend test!", }, { status: 200 })
  
}