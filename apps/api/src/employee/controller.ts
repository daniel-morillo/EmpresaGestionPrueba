import { Request, Response, NextFunction } from "express";
import {
  getEmployeeParamsDefinition,
  getEmployeeQueryDefinition,
  createEmployeeInputDefinition,
  updateEmployeeQueryDefinition,
  updateEmployeeInputDefinition,
} from "shared/src/models";
import { employeeService } from "./service";

async function getEmployees(req: Request, res: Response, next: NextFunction) {
  try {
    const query = getEmployeeQueryDefinition.parse(req.query);
    const employees = await employeeService.getEmployees(query);
    return res.status(200).json(employees);
  } catch (error) {
    next(error); 
  }
}

async function getEmployee(req: Request, res: Response, next: NextFunction) {
  try {
    const params = getEmployeeParamsDefinition.parse(req.params);
    const employee = await employeeService.getEmployee(params._id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
}

async function createEmployee(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createEmployeeInputDefinition.parse(req.body);
    const employee = await employeeService.createEmployee(input);
    return res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
}

async function updateEmployee(req: Request, res: Response, next: NextFunction) {
  try {
    const params = updateEmployeeQueryDefinition.parse(req.params);
    const input = updateEmployeeInputDefinition.parse(req.body);
    const employee = await employeeService.updateEmployee(params._id, input);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
}

export const employeeController = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
} as const;




