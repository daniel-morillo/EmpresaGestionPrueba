import {z} from "zod";
import { baseModelDefinition } from "../definitions";

export const employeeDefinition = baseModelDefinition.extend({
    name: z.string().nonempty("Employee Name must not be empty"),
    email: z.string().nonempty("Employee Email must not be empty"),
});

export type IEmployee = z.infer<typeof employeeDefinition>;

export const getEmployeeQueryDefinition = employeeDefinition.partial();
export type TGetEmployeeQueryDefinition = z.infer<typeof getEmployeeQueryDefinition>;

export const getEmployeeParamsDefinition = employeeDefinition.pick({
    _id: true,
});
export type TGetEmployeeParamsDefinition = z.infer<typeof getEmployeeParamsDefinition>;

export const createEmployeeInputDefinition = employeeDefinition.omit({
    _id: true,
});
export type TCreateEmployeeInputDefinition = z.infer<typeof createEmployeeInputDefinition>;

export const updateEmployeeQueryDefinition = employeeDefinition.pick({
    _id: true,
})
export type TUpdateEmployeeQueryDefinition = z.infer<typeof updateEmployeeQueryDefinition>;

export const updateEmployeeInputDefinition = employeeDefinition.partial();
export type TUpdateEmployeeInputDefinition = z.infer<typeof updateEmployeeInputDefinition>;