import { Request, Response, NextFunction } from "express";
import {
    getDepartmentParamsDefinition,
    getDepartmentQueryDefinition,
    createDepartmentInputDefinition,
     updateDepartmentInputDefinition
    , updateDepartmentQueryDefinition,
} from "shared/src/models"; 
import { departmentService } from "./service";

async function getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
        const query = getDepartmentQueryDefinition.parse(req.query);
        const departments = await departmentService.getDepartments(query);
        return res.status(200).json(departments);
    } catch (error) {
        next(error); 
    }
}

async function getDepartment(req: Request, res: Response, next: NextFunction) {
    try {
        const params = getDepartmentParamsDefinition.parse(req.params);
        const department = await departmentService.getDepartment(params._id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        return res.status(200).json(department);
    } catch (error) {
        next(error);
    }
}

async function createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
        const input = createDepartmentInputDefinition.parse(req.body);
        const department = await departmentService.createDepartment(input);
        return res.status(201).json(department);
    } catch (error) {
        next(error);
    }
}

async function updateDepartment(req: Request, res: Response, next: NextFunction) {
    try {
        const params = updateDepartmentQueryDefinition.parse(req.params);
        const input = updateDepartmentInputDefinition.parse(req.body);
        const department = await departmentService.updateDepartment(params._id, input);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        return res.status(200).json(department);
    } catch (error) {
        next(error);
    }
}

async function addEmployeeToDepartment(req: Request, res: Response, next: NextFunction) {
    try {
        const { _id, employeeId } = req.params;
        const department = await departmentService.addEmployeeToDepartment(_id, employeeId);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        return res.status(200).json(department);
    } catch (error) {
        next(error);
    }
}

async function removeEmployeeFromDepartment(req: Request, res: Response, next: NextFunction) {
    try {
        const { _id, employeeId } = req.params;
        const department = await departmentService.removeEmployeeFromDepartment(_id, employeeId);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        return res.status(200).json(department);
    } catch (error) {
        next(error);
    }
}

export const departmentController = {
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    addEmployeeToDepartment,
    removeEmployeeFromDepartment,
} as const