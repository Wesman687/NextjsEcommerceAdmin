
import { dbConnect } from '../../lib/mongo'
import {buffer} from 'micro'
const stripe = require('stripe')(process.env.STRIPE_PUBLIC_TEST_SECRET_KEY)
const endpointSecret = "whsec_30cb18eb0758971b733e4dd9b72f8c33671f98779b9c000da273c068f4c366dc";


export default async function POST(req, res){
    dbConnect()
    const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded)
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

}

export const config = {
    api: {bodyParser: false}
}