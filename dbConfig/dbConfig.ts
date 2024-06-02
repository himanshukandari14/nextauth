import { error } from "console";
import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log('MongoDB connected')
        })

        connection.on('error',()=>{
            console.log('please make sure mongo db is running',error);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong, connecting db',error)
    }
}