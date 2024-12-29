import { Schema } from "mongoose";
import { IDepartment } from "./dto";
import { model } from "mongoose";

//Department contains a name, description and employees that reference the employee model
export const departmentSchema = new Schema<IDepartment>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    employees: [{type: Schema.Types.ObjectId, ref: "employee"}]
},{timestamps: true});

export const Department = model<IDepartment>("Department", departmentSchema);