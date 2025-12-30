import mongoose from 'mongoose';

const { Schema } = mongoose;

const aiProfileSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
        preferences: { type: Schema.Types.Mixed },
        goals: { type: Schema.Types.Mixed },
        constraints: { type: Schema.Types.Mixed },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model('AIProfile', aiProfileSchema);