import { Request, Response, NextFunction } from "express";
import {getjerarchyParamsDefinition, 
    getjerarchyQueryDefinition, 
    createjerarchyInputDefinition, 
    updatejerarchyQueryDefinition, 
    updatejerarchyInputDefinition
} from "shared/src/models";
import { jerarchyService } from "./service";
import { departmentService } from "../department";
import { employeeService } from "../employee";



async function getjerarchies(req: Request, res: Response, next: NextFunction) {
    try {
        const query = getjerarchyQueryDefinition.parse(req.query);
        const jerarchies = await jerarchyService.getJerarchies(query);
        return res.status(200).json(jerarchies);
    } catch (error) {
        next(error);
    }
}

async function getjerarchy(req: Request, res: Response, next: NextFunction) {
    try {
        const params = getjerarchyParamsDefinition.parse(req.params);
        const jerarchy = await jerarchyService.getJerarchy(params._id);
        if (!jerarchy) {
            return res.status(404).json({ message: "jerarchy not found" });
        }
        return res.status(200).json(jerarchy);
    } catch (error) {
        next(error);
    }
}

async function createjerarchy(req: Request, res: Response, next: NextFunction) {
    try {
        
        const input = createjerarchyInputDefinition.parse(req.body);
        const { department: departmentId, superior: superiorId, employee: employeeId } = input;

        const employee = await employeeService.getEmployee(employeeId);
        const department = await departmentService.getDepartment(departmentId);
        const superior = await employeeService.getEmployee(superiorId);

        console.log(employee, department, superior);

        if (!employee || !department || !superior) {
            return res.status(404).json({ message: "employee, department or superior not found" });
        }

        if (await jerarchyService.isSuperior(superiorId.toString(), employeeId.toString(), departmentId.toString())) {
            return res.status(400).json({ message: "superior already exists" });
        }

        if (await jerarchyService.hasSuperior(employeeId.toString(), departmentId.toString())) {
            return res.status(400).json({ message: "employee has already a superior" });
        }

        const jerarchy = await jerarchyService.createJerarchy(input);
        return res.status(201).json(jerarchy);
    } catch (error) {
        next(error);
    }
}

async function updatejerarchy(req: Request, res: Response, next: NextFunction) {
    try {

        const params = updatejerarchyQueryDefinition.parse(req.params);
        const { departmentId, superiorId, employeeId } = req.body;
        const department = departmentService.getDepartment(departmentId);
        const superior = jerarchyService.getJerarchy(superiorId);
        const employee = employeeService.getEmployee(employeeId);

        if (!department || !superior || !employee) {
            return res.status(404).json({ message: "department, superior or employee not found" });
        }

        const input = updatejerarchyInputDefinition.parse(req.body);
        const jerarchy = await jerarchyService.updateJerarchy(params._id, input);
        if (!jerarchy) {
            return res.status(404).json({ message: "jerarchy not found" });
        }
        return res.status(200).json(jerarchy);
    } catch (error) {
        next(error);
    }
}

async function removejerarchy(req: Request, res: Response, next: NextFunction) {
    try {
        const params = getjerarchyParamsDefinition.parse(req.params);
        const jerarchy = await jerarchyService.removeJerarchy(params._id);
        if (!jerarchy) {
            return res.status(404).json({ message: "jerarchy not found" });
        }
        return res.status(200).json(jerarchy);
    } catch (error) {
        next(error);
    }
}

async function getjerarchiesByEmployee(req: Request, res: Response, next: NextFunction) {
    try {
        const { employeeId } = req.params;
        if (!employeeService.getEmployee(employeeId)) {
            return res.status(404).json({ message: "employee not found" });
        }
        const jerarchies = await jerarchyService.getJerarchiesByEmployee(employeeId);
        return res.status(200).json(jerarchies);
    } catch (error) {
        next(error);
    }
}

async function getjerarchiesBySuperior(req: Request, res: Response, next: NextFunction) {
    try {
        const { superiorId } = req.params;

        if (!employeeService.getEmployee(superiorId)) {
            return res.status(404).json({ message: "superior not found" });
        }

        const jerarchies = await jerarchyService.getJerarchiesBySuperior(superiorId);
        return res.status(200).json(jerarchies);
    } catch (error) {
        next(error);
    }
}

async function getjerarchiesByDepartment(req: Request, res: Response, next: NextFunction) {
    try {
        const { departmentId } = req.params;

        if (!departmentService.getDepartment(departmentId)) {
            return res.status(404).json({ message: "department not found" });
        }

        const jerarchies = await jerarchyService.getJerarchiesByDepartment(departmentId);
        return res.status(200).json(jerarchies);
    } catch (error) {
        next(error);
    }
}

export const jerarchyController = {
    getjerarchies,
    getjerarchy,
    createjerarchy,
    updatejerarchy,
    removejerarchy,
    getjerarchiesByEmployee,
    getjerarchiesBySuperior,
    getjerarchiesByDepartment
} as const;
