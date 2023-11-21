import express from "express";
import userRoutes from "../routes/userRoutes.js";
import { globalErrHandler, notFound } from "../middleware/globalErrHandler.js";
import productRoutes from "../routes/productRoutes.js";
import categoryRouter from "../routes/categorieRoutes.js";
import brandsRouter from "../routes/brandRoutes.js";
import colorRouter from "../routes/colorRoutes.js";
import reviewRouter from "../routes/reviewRoutes.js";
import orderRouter from "../routes/orderRoutes.js";
import Stripe from "stripe";

const app = express();

// Stripe Webhook
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_98e746c9d412779a5929a1bbcc5d487f1dabe5cab69fca772e08bc484edb1dbf";

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  try {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      // Construct the event from the request body and Stripe-Signature header
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      // If the signature is incorrect, respond with a 400 status code
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  } catch (error) {
    console.error(`Error in webhook processing: ${error.message}`);
    response.status(500).send(`Internal Server Error`);
  }
});

app.use(express.json());

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/brand', brandsRouter);
app.use('/api/v1/color', colorRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/order', orderRouter);

// Middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;
