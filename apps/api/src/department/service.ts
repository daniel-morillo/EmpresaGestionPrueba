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
    const department = await Department.findById(departmentId);
    const employee = await Employee.findById(employeeId);
    if ((!department) || (!employee)) {
        return null;
    }
    department.employees.push(employeeId);
    await department.save();

    return department;
}

async function removeEmployeeFromDepartment(departmentId: string, employeeId: string) {
    const department = await Department.findById(departmentId);
    const employee = department?.employees.find((id) => id.toString() === employeeId);
    if (!department || !employee) {
        return null;
    }
    department.employees = department.employees.filter((id) => id.toString() !== employeeId);
    await department.save();

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