import { IEmployee, TGetEmployeeParamsDefinition, TGetEmployeeQueryDefinition } from "../../models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getEmployees(){
    const response = await api.get("/employees");
    const employees = (await response.json()) as IEmployee[];
    return employees;
}

export function useEmployees(){
    return useQuery({queryKey: ["getEmployees"], queryFn: getEmployees})
}
