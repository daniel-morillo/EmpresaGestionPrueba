import { Router } from "express";
import { EmployeeRouter } from "./employee";
import { DepartmentRouter } from "./department";
import { JerarchyRouter } from "./jerarchy";

const router = Router();

router.use('/employees' , EmployeeRouter);
router.use('/departments', DepartmentRouter);
router.use('/jerarchies', JerarchyRouter);

export {router};