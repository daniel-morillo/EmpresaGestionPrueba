import {z} from "zod";
import { baseModelDefinition } from "../definitions";
import { isValidObjectId, Types } from "mongoose";

export const jerarchyDefinition = baseModelDefinition.extend({
    employee: z.instanceof(
        Types.ObjectId)
        .or(z.string().refine(isValidObjectId)),
    superior: z.instanceof(
        Types.ObjectId)
        .or(z.string().refine(isValidObjectId)),
    department: z.instanceof(
        Types.ObjectId)
        .or(z.string().refine(isValidObjectId)),
});

export type IJerarchy = z.infer<typeof jerarchyDefinition>;

export const getjerarchyQueryDefinition = jerarchyDefinition.partial();
export type TGetJerarchyQueryDefinition = z.infer<typeof getjerarchyQueryDefinition>;

export const getjerarchyParamsDefinition = jerarchyDefinition.pick({
    _id: true,
});
export type TGetJerarchyParamsDefinition = z.infer<typeof getjerarchyParamsDefinition>;

export const createjerarchyInputDefinition = jerarchyDefinition.omit({
    _id: true,
});
export type TCreateJerarchyInputDefinition = z.infer<typeof createjerarchyInputDefinition>;

export const updatejerarchyQueryDefinition = jerarchyDefinition.pick({
    _id: true,
})
export type TUpdateJerarchyQueryDefinition = z.infer<typeof updatejerarchyQueryDefinition>;

export const updatejerarchyInputDefinition = jerarchyDefinition.partial();
export type TUpdateJerarchyInputDefinition = z.infer<typeof updatejerarchyInputDefinition>;