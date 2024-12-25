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

// Añadir empleado a un departamento
export async function addEmployeeToDepartment({
    _id,
    employeeId,
  }: {
    _id: string;
    employeeId: string;
  }) {
    await api.put(`/departments/${_id}/add-employee/${employeeId}`, {});
  }
  
  export function useAddEmployeeToDepartment() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["addEmployeeToDepartment"],
      mutationFn: addEmployeeToDepartment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getDepartments"] });
      },
    });
  }
  
  // Eliminar empleado de un departamento
  export async function removeEmployeeFromDepartment({
    _id,
    employeeId,
  }: {
    _id: string;
    employeeId: string;
  }) {
    await api.put(`/departments/${_id}/remove-employee/${employeeId}`, {});
  }
  
  export function useRemoveEmployeeFromDepartment() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["removeEmployeeFromDepartment"],
      mutationFn: removeEmployeeFromDepartment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getDepartments"] });
      },
    });
  }
  
  