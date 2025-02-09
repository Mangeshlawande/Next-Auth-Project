import mongoose from "mongoose";


export async function connect() {

    try {
            mongoose.connect(process.env.MONGODB_URL! )
            const connection = mongoose.connection;
            connection.on('connected', () => {
                console.log(`MongoDB connected successfully !`);  
            })

            connection.on('error', (error) => {
                console.log(`MongoDB Connection error. Please make sure MongoDB is running :: ${error}`);
                process.exit();
            })
    } catch (error) {
        console.log("something went wrong !");
        console.log(error);
    }
};