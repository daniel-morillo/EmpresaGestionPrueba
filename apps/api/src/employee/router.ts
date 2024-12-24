import { Router } from "express";
import { employeeController } from "./controller";
import { asyncHandler } from "../middleware/asyncHandler";

const EmployeeRouter = Router();

EmployeeRouter.get("/", asyncHandler(employeeController.getEmployees));
EmployeeRouter.get("/:_id", asyncHandler(employeeController.getEmployee));
EmployeeRouter.post("/", asyncHandler(employeeController.createEmployee));
EmployeeRouter.put("/:_id", asyncHandler(employeeController.updateEmployee));

export { EmployeeRouter };

