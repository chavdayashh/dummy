import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.PORT, (req, res) =>{
    console.log(`Server is working on part ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})