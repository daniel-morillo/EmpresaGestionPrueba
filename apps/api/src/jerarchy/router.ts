import { Router } from "express";
import { jerarchyController } from "./controller";
import { asyncHandler } from "../middleware/asyncHandler";

const JerarchyRouter = Router();

JerarchyRouter.get("/", asyncHandler(jerarchyController.getjerarchies));
JerarchyRouter.get("/:_id", asyncHandler(jerarchyController.getjerarchy));
JerarchyRouter.post("/", asyncHandler(jerarchyController.createjerarchy));
JerarchyRouter.put("/:_id", asyncHandler(jerarchyController.updatejerarchy));
JerarchyRouter.delete("/:_id", asyncHandler(jerarchyController.removejerarchy));
JerarchyRouter.get("/employee/:employeeId", asyncHandler(jerarchyController.getjerarchiesByEmployee));
JerarchyRouter.get("/superior/:superiorId", asyncHandler(jerarchyController.getjerarchiesBySuperior));
JerarchyRouter.get("/department/:departmentId", asyncHandler(jerarchyController.getjerarchiesByDepartment));



export { JerarchyRouter};
