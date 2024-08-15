import {errHandler} from "../utlies/error.js"
import Client from "../models/client.modal.js"
import MonthlySubscriber from "../models/monthlySubscibe.model.js"
  const Clientside=async(req,res,next)=>{
     if(req.body.name===''||!req.body.email===''||!req.body.subject===""||!req.body.message===""){
        return next(errHandler(400,"Please fill all the fields"));
     } 

    try{
        const newClient=new Client({
            clientName:req.body.name,
            email:req.body.email,
            subject:req.body.subject,
            message:req.body.message
        });
        await newClient.save();
        res.status(201).json(newClient);
    }catch(error){
        next(error);
    }
}
const addMonthlySubscribe=async(req,res,next)=>{
    if(req.body.firstName===''||!req.body.lastName===''||!req.body.email===""){
        return next(errHandler(400,"Please fill all the fields"));
     } 
    try{
        const newSubscriber=new MonthlySubscriber({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email
        });
        await newSubscriber.save();
        res.status(200).json(newSubscriber);
    }catch(error){
        next(error);
    }
}
export {Clientside,addMonthlySubscribe}