import { model } from "mongoose";
import { IEmployee, 
    TGetEmployeeQueryDefinition,
    TGetEmployeeParamsDefinition,
    employeeEschema,
    TCreateEmployeeInputDefinition,
    TUpdateEmployeeQueryDefinition,
    TUpdateEmployeeInputDefinition,
 } from "shared/src/models";

const Employee = model("Employee", employeeEschema);

async function getEmployees(filter: TGetEmployeeQueryDefinition = {}) {
    const employees = await Employee.find(filter);
    return employees;
}

async function getEmployee(_id: TGetEmployeeParamsDefinition["_id"]) {
    const employee = await Employee.findById(_id);
    return employee;
}

async function createEmployee(input: TCreateEmployeeInputDefinition) {
    const employee = await Employee.create(input)
    return employee;
}

async function updateEmployee(_id: TUpdateEmployeeQueryDefinition["_id"], input: TUpdateEmployeeInputDefinition) {
    const employee = await Employee.findByIdAndUpdate(_id, input, {new: true});	
    return employee;
}

export const employeeService = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
} as const