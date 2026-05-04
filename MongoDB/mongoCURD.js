import express from 'express';
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/student");
let app = express();

let studentSchema = mongoose.Schema({
    name: String,
    reg: Number,
    Roll: Number,
    marks: Number
});

let Student = mongoose.model("student", studentSchema);

app.use(express.json());

app.post("/students", async(req, res)=>{
    let result = await Student.insertOne(req.body);
    res.json(result);
})

app.put("/students/:id", async(req, res)=>{
    let result = await Student.updateOne({_id:req.params.id}, {$set:req.body});
    res.json(result);
})

app.delete("/students/:id", async(req, res)=>{
    let result = await Student.deleteOne({_id:req.params.id});
    res.json(result);
})

app.get("/students", async(req, res)=>{
    let result = await Student.find();
    res.json(result);
})

app.listen(3000);
