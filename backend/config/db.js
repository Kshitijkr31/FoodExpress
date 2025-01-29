import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rupalsharma:01u3KqaDCyOagE4a@cluster0.ftxh3.mongodb.net/tomatoapp').then(()=>console.log("DataBase Connected"));
}