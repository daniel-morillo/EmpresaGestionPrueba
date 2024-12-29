import { model, Schema } from "mongoose";
import { IEmployee } from "./dto";

//Employee contains a name, email and departments that reference the department model
export const employeeEschema =  new Schema<IEmployee>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    departments: {
        type: [Schema.Types.ObjectId], 
        ref: "Department",
    }
});

export const Employee = model<IEmployee>("Employee", employeeEschema);