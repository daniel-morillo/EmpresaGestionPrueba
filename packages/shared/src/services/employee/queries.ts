import { IEmployee, TGetEmployeeParamsDefinition} from "../../models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

//This is to handle typescript populated types in client side
type PopulatedDepartment = { _id: string; name: string; description: string };
type PopulatedEmployee = Omit<IEmployee, 'departments'> & { departments: PopulatedDepartment[] };

export async function getEmployees(){
    const response = await api.get("/employees");
    const employees = (await response) as PopulatedEmployee[];
    return employees;
}

export function useEmployees(){
    return useQuery({queryKey: ["getEmployees"], queryFn: getEmployees})
}

export async function getEmployee(_id: TGetEmployeeParamsDefinition['_id']){
    const response = await api.get(`/employees/${_id}`);
    const employee = (await response) as PopulatedEmployee;
    return employee;
}

export function useEmployee(params: TGetEmployeeParamsDefinition){
    return useQuery({queryKey: ["getEmployee", params], queryFn: () => getEmployee(params._id)})
}

export async function getEmployeesByDepartment(departmentId: string) {
    const response = await api.get(`/employees/department/${departmentId}`);
    const employees = (await response) as PopulatedEmployee[];
    return employees;
}

export function useEmployeesByDepartment(departmentId: string) {
    return useQuery({ queryKey: ["getEmployeesByDepartment", departmentId], queryFn: () => getEmployeesByDepartment(departmentId) });
}




