const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'User' , required: true },
    title: { type: String, required: true },
    dueDate: { type: Date },
    description: { type: String },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    imageUrl: { type: String },
    completed: { type: Boolean, default: false }
}, {
    timestamps: true
});     
module.exports = mongoose.model('Todo', todoSchema);