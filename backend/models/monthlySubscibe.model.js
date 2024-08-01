import mongoose from "mongoose";

const monthlySubscribeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: function() {
            const now = new Date();
            return new Date(now.setDate(now.getDate() + 30));
        }
    },
}, { timestamps: true });

const MonthlySubscribe = mongoose.model("MonthlySubscribe", monthlySubscribeSchema);
export default MonthlySubscribe;
