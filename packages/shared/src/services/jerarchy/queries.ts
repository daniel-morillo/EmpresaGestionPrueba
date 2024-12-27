import { IJerarchy,
    TGetJerarchyParamsDefinition,
 } from "../../models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getJerarchies(){
    const response = await api.get("/jerarchies");
    const jerarchies = (await response) as IJerarchy[];
    return jerarchies;
}

export function useJerarchies(){
    return useQuery({queryKey: ["getJerarchies"], queryFn: getJerarchies})
}

export async function getJerarchy(_id: TGetJerarchyParamsDefinition['_id']){
    const response = await api.get(`/jerarchies/${_id}`);
    const jerarchy = (await response) as IJerarchy;
    return jerarchy;
}

export function useJerarchy(params: TGetJerarchyParamsDefinition){
    return useQuery({queryKey: ["getJerarchy", params], queryFn: () => getJerarchy(params._id)})
}

async function getJerarchiesByEmployee(employeeId: string) {
    const response1 = await api.get(`/jerarchies/employee/${employeeId}`);
    const response2 = await api.get(`/jerarchies/superior/${employeeId}`);
    return response1.concat(response2);
  }
  
  
export function useJerarchiesByEmployee(employeeId: string) {
    return useQuery({ queryKey: ["getJerarchiesByEmployee", employeeId], queryFn: () => getJerarchiesByEmployee(employeeId) });
  }

async function getJerarchiesByDepartment(departmentId: string) {
    const response = await api.get(`/jerarchies/department/${departmentId}`);
    return response;
  }

export function useJerarchiesByDepartment(departmentId: string) {
    return useQuery({ queryKey: ["getJerarchiesByDepartment", departmentId], queryFn: () => getJerarchiesByDepartment(departmentId) });
  }



