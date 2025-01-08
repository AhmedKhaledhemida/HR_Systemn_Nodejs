import employeeRouter from "./src/Modules/Employee/Employee.routes.js";

export const bootstrap = (app) => {
  app.use("/api/employee", employeeRouter);
};
