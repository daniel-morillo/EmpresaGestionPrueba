import { Router } from "express";
import { departmentController } from "./controller";
import { asyncHandler } from "../middleware/asyncHandler";

const DepartmentRouter = Router();

DepartmentRouter.get("/", asyncHandler(departmentController.getDepartments));
DepartmentRouter.get("/:_id", asyncHandler(departmentController.getDepartment));
DepartmentRouter.post("/", asyncHandler(departmentController.createDepartment));
DepartmentRouter.put("/:_id", asyncHandler(departmentController.updateDepartment));
DepartmentRouter.put("/:_id/add-employee/:employeeId", asyncHandler(departmentController.addEmployeeToDepartment));
DepartmentRouter.put("/:_id/remove-employee/:employeeId", asyncHandler(departmentController.removeEmployeeFromDepartment));

export { DepartmentRouter};