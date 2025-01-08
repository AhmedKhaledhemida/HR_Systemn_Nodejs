import { Router } from "express";
import {
  allowedTo,
  checkEmail,
  protectedRoutes,
} from "../../Middlewares/checkEmployee.js";
import {
  addAttendance,
  addEmployee,
  editEmployee,
  getAttendance,
  getEmployee,
  Signin,
  Signup,
} from "./Employee.controller.js";

const employeeRouter = Router();
employeeRouter.post(
  "/signup",
  checkEmail,

  Signup
);
employeeRouter.post("/signin", Signin);
employeeRouter.post(
  "/add",
  protectedRoutes,
  allowedTo("HR"),
  checkEmail,

  addEmployee
);
employeeRouter.put("/edit/:id", protectedRoutes, allowedTo("HR"), editEmployee);
employeeRouter.get("/", protectedRoutes, allowedTo("HR"), getEmployee);
employeeRouter.post(
  "/attendance/:id",
  protectedRoutes,
  allowedTo("HR"),
  addAttendance
);
employeeRouter.get(
  "/attendance",
  protectedRoutes,
  allowedTo("HR"),
  getAttendance
);

export default employeeRouter;
