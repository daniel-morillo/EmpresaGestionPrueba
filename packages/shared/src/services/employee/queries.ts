import { IEmployee, TGetEmployeeParamsDefinition} from "../../models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getEmployees(){
    const response = await api.get("/employees");
    const employees = (await response) as IEmployee[];
    return employees;
}

export function useEmployees(){
    return useQuery({queryKey: ["getEmployees"], queryFn: getEmployees})
}

export async function getEmployee(_id: TGetEmployeeParamsDefinition['_id']){
    const response = await api.get(`/employees/${_id}`);
    const employee = (await response) as IEmployee;
    return employee;
}

export function useEmployee(params: TGetEmployeeParamsDefinition){
    return useQuery({queryKey: ["getEmployee", params], queryFn: () => getEmployee(params._id)})
}


