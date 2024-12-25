import { IDepartment, 
    TGetDepartmentParamsDefinition
 } from "../../models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getDepartments(){
    const response = await api.get("/departments");
    const departments = (await response) as IDepartment[];
    return departments;
}

export function useDepartments(){
    return useQuery({queryKey: ["getDepartments"], queryFn: getDepartments})
}

export async function getDepartment(_id: TGetDepartmentParamsDefinition['_id']){
    const response = await api.get(`/departments/${_id}`);
    const department = (await response) as IDepartment;
    return department;
}

export function useDepartment(params: TGetDepartmentParamsDefinition){
    return useQuery({queryKey: ["getDepartment", params], queryFn: () => getDepartment(params._id)})
}