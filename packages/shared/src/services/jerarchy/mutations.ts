import { IJerarchy,
    TCreateJerarchyInputDefinition,
    TUpdateJerarchyInputDefinition,
    TUpdateJerarchyQueryDefinition,
 } from "../../models";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export async function createJerarchy(input: TCreateJerarchyInputDefinition){
    const response = await api.post("/jerarchies", input);
    const jerarchy = (await response) as IJerarchy;
    return jerarchy;
}

export function useCreateJerarchy() {
    return useMutation({
      mutationKey: ["createJerarchy"],
      mutationFn: createJerarchy,
    });
  }

export async function updateJerarchy({_id, ...rest}:
    {_id: TUpdateJerarchyQueryDefinition['_id'], input: TUpdateJerarchyInputDefinition}) {
    const { input } = rest; // Extraemos "input" de "rest"
    const response = await api.put(`/jerarchies/${_id}`, input);
    const jerarchy = (await response) as IJerarchy;
    return jerarchy;
}

export function useUpdateJerarchy(){
    const queryClient = useQueryClient();
    return useMutation({mutationKey: ["updateJerarchy"], mutationFn: updateJerarchy, 
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["getJerarchies"] });
            queryClient.invalidateQueries({ queryKey: ["getJerarchy", data._id] });
        }
    })
}

export async function removeJerarchy(_id: TUpdateJerarchyQueryDefinition['_id']){
    const response = await api.delete(`/jerarchies/${_id}`);
    const jerarchy = (await response) as IJerarchy;
    return jerarchy;
}

export function useRemoveJerarchy(){
    const queryClient = useQueryClient();
    return useMutation({mutationKey: ["removeJerarchy"], mutationFn: removeJerarchy, 
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["getJerarchies"] });
            queryClient.invalidateQueries({ queryKey: ["getJerarchy", data._id] });
        }
    })
}

export async function removeJerarchyByEmployeeAndDepartment({
    employeeId,
    departmentId,
  }: {
    employeeId: string;
    departmentId: string;
  }) {
    await api.delete(`/jerarchies/employee/${employeeId}/department/${departmentId}`);
  }
  
  export function useRemoveJerarchyByEmployeeAndDepartment() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["removeJerarchyByEmployeeAndDepartment"],
      mutationFn: removeJerarchyByEmployeeAndDepartment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getJerarchies"] });
      },
    });
  }


