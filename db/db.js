import mongoose from "mongoose";
export const connectToDB = async () => {
    try{
        const response = await mongoose.connect(process.env.MONGO_URL); 
        console.log("Database connected successfully at : ", response.connection._connectionString);
    }

    catch(error){
        console.log("Error connecting Database" , error);
    }
}

