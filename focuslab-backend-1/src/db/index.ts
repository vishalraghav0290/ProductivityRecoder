import mongoose from "mongoose";
import { databaseName } from "../constrainst";

const connectDB = async ()=>{
    try {
        // the reason to using database name is to avoid creating multiple databases in mongo atlas
       const connectedData= await mongoose.connect(`${process.env.MONGODB_URI}/${databaseName}`);
       console.log("MongoDB connected successfully to ", connectedData.connection.host);
        
    } catch (error) {
        console.log("error while connecting to db", error);
        process.exit(1);
        
    }
}

export default connectDB;