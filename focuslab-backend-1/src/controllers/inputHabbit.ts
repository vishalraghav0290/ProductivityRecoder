import express from 'express';
import Activity from '../db/schema/activity';



const router = express.Router();


export const inputhabbbit = async (req: express.Request, res: express.Response) => {
    try{
        const {habbitName , userId} = req.body;
        if(!habbitName){
            return res.status(400).json({error : "habbitName is required"}); 
        }
        // Here you can add logic to save the habit to the database if needed
        const activity = await Activity.create({userId , name : habbitName});
        return res.status(201).json(activity);
    }
    catch(err){
        return res.status(500).json({error : "errror while input the inputhabbit"})
    }
}