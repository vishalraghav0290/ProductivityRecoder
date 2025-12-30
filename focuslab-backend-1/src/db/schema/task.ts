import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String },
        priority: { type: String, enum: ['urgent', 'important'] },
        category: { type: String, enum: ['work', 'health', 'personal'] },
        estimatedTime: { type: Number }, // minutes
        dueDate: { type: Date },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model('Task', taskSchema);