import { model } from "mongoose";
import {IJerarchy, 
    TGetJerarchyQueryDefinition, 
    TGetJerarchyParamsDefinition, 
    TCreateJerarchyInputDefinition, 
    TUpdateJerarchyQueryDefinition, 
    TUpdateJerarchyInputDefinition, jerarchySchema
} from "shared/src/models"

const Jerarchy = model("jerarchy",jerarchySchema)

async function getJerarchies(filter: TGetJerarchyQueryDefinition = {}) {
    const jerarchies = await Jerarchy.find(filter).populate("employee").populate("superior").populate("department");
    return jerarchies;
}

async function getJerarchy(_id: TGetJerarchyParamsDefinition["_id"]) {
    const jerarchy = await Jerarchy.findById(_id).populate("employee").populate("superior").populate("department");
    return jerarchy;

}

async function createJerarchy(input: TCreateJerarchyInputDefinition) {
    const jerarchy = await Jerarchy.create(input)
    return jerarchy;
}

async function updateJerarchy(_id: TUpdateJerarchyQueryDefinition["_id"], input: TUpdateJerarchyInputDefinition) {
    const jerarchy = await Jerarchy.findByIdAndUpdate(_id, input);
    return jerarchy;
}

async function removeJerarchy(_id: TGetJerarchyParamsDefinition["_id"]) {
    const jerarchy = await Jerarchy.findByIdAndDelete(_id);
    return jerarchy;
}

async function getJerarchiesByEmployee(employeeId: string) {
    const jerarchies = await Jerarchy.find({ employee: employeeId }).populate("employee").populate("superior").populate("department");
    return jerarchies;
}

async function getJerarchiesBySuperior(superiorId: string) {
    const jerarchies = await Jerarchy.find({ superior: superiorId }).populate("employee").populate("superior").populate("department");
    return jerarchies;
}

async function getJerarchiesByDepartment(departmentId: string) {
    const jerarchies = await Jerarchy.find({ department: departmentId }).populate("employee").populate("superior");
    return jerarchies;
}

async function isSuperior(employeeId: string, superiorId: string, departmentId: string) {
    const jerarchies = await Jerarchy.find({ employee: employeeId, superior: superiorId, department: departmentId });
    return jerarchies.length > 0;
}

async function hasSuperior(employeeId: string, departmentId: string) {
    const jerarchies = await Jerarchy.find({ employee: employeeId, department: departmentId });
    return jerarchies.length > 0;
}



export const jerarchyService = {
    getJerarchies,
    getJerarchy,
    createJerarchy,
    updateJerarchy,
    removeJerarchy,
    getJerarchiesByEmployee,
    getJerarchiesBySuperior,
    getJerarchiesByDepartment,
    isSuperior,
    hasSuperior

};

