import mongoose from 'mongoose'

const CounterSchema = new mongoose.Schema({
    value: { type: Number, required: true, default: 0},
    id_company: { type: String, required: true },
    for: {type: String, enum: ["os", "maintenance", "components"]}
})

const Counter = mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

export default Counter; 