import mongoose from 'mongoose';

const { Schema } = mongoose;

const activityLogSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        activityId: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
        date: { type: Date, required: true },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// Unique compound index to ensure a user can't log the same activity on the same date twice
activityLogSchema.index({ userId: 1, activityId: 1, date: 1 }, { unique: true });

export default mongoose.model('ActivityLog', activityLogSchema);