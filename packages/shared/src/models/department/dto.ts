import {z} from "zod";
import { baseModelDefinition } from "../definitions";
import { Types, isValidObjectId } from "mongoose";

//Define the department using our model definition, adding a name, description and employees that reference the employee model
export const departmentDefinition = baseModelDefinition.extend({
    name: z.string().nonempty("Department Name must not be empty"),
    description: z.string().nonempty("Department Description must not be empty"),
    employees: z
    .array(z.instanceof(Types.ObjectId).or(z.string().refine(isValidObjectId)))
});

export type IDepartment = z.infer<typeof departmentDefinition>;

export const getDepartmentQueryDefinition = departmentDefinition.partial();
export type TGetDepartmentQueryDefinition = z.infer<typeof getDepartmentQueryDefinition>;

export const getDepartmentParamsDefinition = departmentDefinition.pick({
    _id: true,
});
export type TGetDepartmentParamsDefinition = z.infer<typeof getDepartmentParamsDefinition>;

export const createDepartmentInputDefinition = departmentDefinition.omit({
    _id: true,
});
export type TCreateDepartmentInputDefinition = z.infer<typeof createDepartmentInputDefinition>;

export const updateDepartmentQueryDefinition = departmentDefinition.pick({
    _id: true,
})
export type TUpdateDepartmentQueryDefinition = z.infer<typeof updateDepartmentQueryDefinition>;

export const updateDepartmentInputDefinition = departmentDefinition.partial();
export type TUpdateDepartmentInputDefinition = z.infer<typeof updateDepartmentInputDefinition>;