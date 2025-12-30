import mongoose from 'mongoose';

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        plan: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model('Subscription', subscriptionSchema);