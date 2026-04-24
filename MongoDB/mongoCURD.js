import express from 'express';
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/student");

let studentSchema = mongoose.Schema({
    name: String,
    reg: Number,
    Roll: Number,
    marks: Number
});

let Student = mongoose.model("student", studentSchema);

