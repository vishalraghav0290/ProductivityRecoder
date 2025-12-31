import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        image : { type: String },
        refreshToken: { type: String },
    }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);


// here we need to encrypt the password before it save in our db 

userSchema.pre("save", async function (this: any, next: any) {
    if (!this.isModified('password')) return next();
    // hashing the password
    const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
    next();
});

// here we check teh password druing login 
userSchema.methods.comparePassword = async function (password : string){
    return await bcrypt.compare(password, this.password);
    
}


export default mongoose.model('User', userSchema);