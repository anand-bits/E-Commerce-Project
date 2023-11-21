import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Order Item Schema
const OrderItemSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assuming your product model is named 'Product'
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Order Schema
const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: {
      type: [OrderItemSchema],
      required: true,
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      default: () => {
        const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
        const randomNumbers = Math.floor(1000 + Math.random() * 90000);
        return randomTxt + randomNumbers;
      },
    },
    paymentStatus: {
      type: String,
      default: 'Not paid',
    },
    paymentMethod: {
      type: String,
      default: 'Not specified',
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    currency: {
      type: String,
      default: 'Not specified',
    },
    //For Adminn------
    
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'processing', 'shipped', 'delivered'],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compile to form model
const Order = mongoose.model('Order', OrderSchema);

export default Order;
