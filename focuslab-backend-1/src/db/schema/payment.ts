import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription' },
        amount: { type: Number },
        currency: { type: String },
        status: { type: String, enum: ['pending', 'completed', 'failed'] },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model('Payment', paymentSchema);