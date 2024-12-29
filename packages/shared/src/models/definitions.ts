import { z} from "zod";
import {Types, isValidObjectId} from "mongoose"

export const objectIdDefinition = z
    .instanceof(Types.ObjectId)
    .or(z.string().refine(isValidObjectId));

//This is  abase model that we can extend to create other models, it ensures that the model has an _id field
export const baseModelDefinition = z.object({
    _id: objectIdDefinition,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});



