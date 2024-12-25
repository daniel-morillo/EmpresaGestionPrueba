import {
    IDepartment,
    TCreateDepartmentInputDefinition, 
    TUpdateDepartmentInputDefinition,
    TUpdateDepartmentQueryDefinition,
} from "../../models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export async function createDepartment(input: TCreateDepartmentInputDefinition){
    const response = await api.post("/departments", input);
    const department = (await response) as IDepartment;
    return department;
}

export function useCreateDepartment() {
    return useMutation({
      mutationKey: ["createDepartment"],
      mutationFn: createDepartment,
    });
  }

export async function updateDepartment({_id, ...rest}:
    {_id: TUpdateDepartmentQueryDefinition['_id'], input: TUpdateDepartmentInputDefinition}) {
    const { input } = rest; // Extraemos "input" de "rest"
    const response = await api.put(`/departments/${_id}`, input);
    const department = (await response) as IDepartment;
    return department;
}

export function useUpdateDepartment(){
    const queryClient = useQueryClient();
    return useMutation({mutationKey: ["updateDepartment"], mutationFn: updateDepartment, 
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["getDepartments"] });
            queryClient.invalidateQueries({ queryKey: ["getDepartment", data._id] });
        }
    })
}