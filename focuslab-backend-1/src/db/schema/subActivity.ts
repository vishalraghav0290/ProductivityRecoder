import mongoose from 'mongoose';

const { Schema } = mongoose;

const subActivitySchema = new Schema(
        {
                activityId: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
                name: { type: String, required: true },
        },
        { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model('SubActivity', subActivitySchema);