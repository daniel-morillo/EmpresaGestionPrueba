import { Schema } from "mongoose";
import { IEmployee } from "./dto";

export const employeeEschema =  new Schema<IEmployee>({
    name: {type: String, required: true},
    email: {type: String, required: true},
});