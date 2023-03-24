import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { stringToHash, varifyHash } from "bcrypt-inzi"
// import {nanoid} from 'nanoid'
const app = express();

app.use(express.json());
app.use(cors());

let port = 3000 || process.env.PORT;


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

const userModel = mongoose.model('userData', userSchema);

app.post("/signup", async (req, res) => {

    let body = req.body;

    if (!body.firstName || !body.lastName || !body.email || !body.password) {
        res.status(400).send(`required fields missing,example request:{
         firstName:Tushar,
         lastName:Rai,
         email:abc@gmail.com,
         password:12345
     }`)
        return;
    }

    let newUser = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email.toLowerCase(),
        password: body.password
    }

    // const findOne = async () => {
        
        const data = await userModel.findOne({email:body.email});
        console.log(data);
        try{
            if(data!==null){
                console.log("Data is already present");
                res.send({message:"User exists please login"})
            }
            else{
                    userModel.create(newUser)
                    .then((res)=>{
                        console.log(res+"ding dong");
                    })
                    
                    res.send({message:"User created"})
                
            }
        }
        catch(err){
            res.send("Error")
            console.log("err: "+err);
        }
})


app.post("/login", async (req, res) => {

    let body = req.body;

    if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }
    const data = await userModel.findOne({email:body.email});
    try{
        if(data){
            if(data.password!=body.password){
                res.send({message:"Incorrect password"})
                return;
            }
            console.log("Data is already present");
                res.send({message:"Logged in Successfully"})
        }
        else{
            console.log("No user exists");
            res.send({message:"User does not exists, please signup"})
        }
    }
    catch(err){
        console.log(err);
    }
})




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})













// mongodb+srv://verselon2000:<password>@cluster0.6j4igyn.mongodb.net/?retryWrites=true&w=majority
let dbURI = 'mongodb+srv://verselon2000:W4iqNZvQcMrmNi31@cluster0.6j4igyn.mongodb.net/socialMediaBase?retryWrites=true&w=majority'
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log("mongoose is connected");
});

mongoose.connection.on('disconnected', () => {
    console.log("mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', (err) => {
    console.log(err);
    process.exit(1);
});

//   SIGINT  it means agar koi ctrl se close kr raha hai server ko to mongoose ko bhi close krdo
process.on('SIGINT', () => {
    console.log("App is terminating");
    mongoose.connection.close(() => {
        console.log("Mongoose default connection closed");
        process.exit(0);
    })
})