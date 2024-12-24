import { Schema } from "mongoose";
import { IJerarchy } from "./dto";

export const jerarchySchema = new Schema<IJerarchy>({
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    superior: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: false,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
});