import { model } from "mongoose";
import { TGetDepartmentParamsDefinition,
    TGetDepartmentQueryDefinition,
    TCreateDepartmentInputDefinition,
    TUpdateDepartmentQueryDefinition,
    TUpdateDepartmentInputDefinition,
    departmentSchema,
    employeeEschema
 } from "shared/src/models";

const Department = model("department",departmentSchema)
const Employee = model("employee",employeeEschema)

async function getDepartments(filter: TGetDepartmentQueryDefinition = {}) {
    const departments = await Department.find(filter).populate("employees");
    return departments;
}

async function getDepartment(_id: TGetDepartmentParamsDefinition["_id"]) {
    const department = await Department.findById(_id).populate("employees");
    return department;
}

async function createDepartment(input: TCreateDepartmentInputDefinition) {
    const department = await Department.create(input)
    return department;
}

async function updateDepartment(_id: TUpdateDepartmentQueryDefinition["_id"], input: TUpdateDepartmentInputDefinition) {
    const department = await Department.findByIdAndUpdate(_id, input);
    return department;
}

async function addEmployeeToDepartment(departmentId: string, employeeId: string) {
    // Adds a given employee to a given department
    const department = await Department.findById(departmentId);
    const employee = await Employee.findById(employeeId);

    if (!department || !employee) {
        // If the department or employee does not exist, return null
        return null;
    }

    if (!department.employees.includes(employeeId)) {
        // If the employee is not already in the department, add them
        department.employees.push(employeeId);
    }

    if (!employee.departments.includes(departmentId)) {
        // If the department is not already in the employee's departments, add it
        employee.departments.push(departmentId);
    }

    await department.save();
    await employee.save();

    return department;
}

async function removeEmployeeFromDepartment(departmentId: string, employeeId: string) {
    // Removes a given employee from a given department
    const department = await Department.findById(departmentId);
    const employee = await Employee.findById(employeeId);

    if (!department || !employee) {
        // If the department or employee does not exist, return nothing
        return null;
    }

    // Remove the employee from the department and the department from the employee
    department.employees = department.employees.filter(
        (id) => id.toString() !== employeeId
    );

    employee.departments = employee.departments.filter(
        (id) => id.toString() !== departmentId
    );

    await department.save();
    await employee.save();

    return department;
}


export const departmentService = {
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    addEmployeeToDepartment,
    removeEmployeeFromDepartment,

} as const