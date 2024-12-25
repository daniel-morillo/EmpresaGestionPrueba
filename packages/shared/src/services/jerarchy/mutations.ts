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

