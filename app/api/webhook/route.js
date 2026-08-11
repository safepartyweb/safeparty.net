// pages/api/nowpayments-webhook.js
import crypto from 'crypto';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
  const receivedHmac = req.headers['x-nowpayments-sig'];
  const body = JSON.stringify(req.body);

  const expectedHmac = crypto
    .createHmac('sha512', ipnSecret)
    .update(body)
    .digest('hex');

  if (receivedHmac !== expectedHmac) {
    return res.status(403).json({ error: 'Invalid HMAC signature' });
  }

  const { payment_status, order_id } = req.body;

  // TODO: Update order in DB based on payment_status (e.g., confirmed, finished, failed)
  res.status(200).json({ message: 'IPN received' });
}
