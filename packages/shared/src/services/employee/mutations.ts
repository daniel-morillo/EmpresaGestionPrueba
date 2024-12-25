import { IEmployee,
    TCreateEmployeeInputDefinition,
    TUpdateEmployeeInputDefinition,
    TUpdateEmployeeQueryDefinition
 } from "../../models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export async function createEmployee(input: TCreateEmployeeInputDefinition){
    const response = await api.post("/employees", input);
    const employee = (await response) as IEmployee;
    return employee;
}

export function useCreateEmployee() {
    return useMutation({
      mutationKey: ["createEmployee"],
      mutationFn: createEmployee,
    });
  }

export async function updateEmployee({_id, ...rest}:
    {_id: TUpdateEmployeeQueryDefinition['_id'], input: TUpdateEmployeeInputDefinition}) {
    const { input } = rest; // Extraemos "input" de "rest"
    const response = await api.put(`/employees/${_id}`, input);
    const employee = (await response) as IEmployee;
    return employee;
}


export function useUpdateEmployee(){
    const queryClient = useQueryClient();
    return useMutation({mutationKey: ["updateEmployee"], mutationFn: updateEmployee, 
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
            queryClient.invalidateQueries({ queryKey: ["getEmployee", data._id] });
        }
    })
}