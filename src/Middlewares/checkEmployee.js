import jwt from "jsonwebtoken";
import { AppError } from "../Utils/appError.js";
import { catchError } from "../Utils/catchError.js";
import { Employee } from "../../Database/Employee.model.js";

// To check if the Hr is Signed in
const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  let employeeDataFromToken = null;
  if (!token) return next(new AppError("Token not provided", 401));

  jwt.verify(token, process.env.JWT_KEY, (err, data) => {
    if (err) return next(new AppError(err, 401));
    employeeDataFromToken = data;
  });

  let employee = await Employee.findById(employeeDataFromToken.employeeId);
  if (!employee) return next(new AppError("User not found", 404));

  req.employee = employee;
  next();
});

// Allow the HR only
const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.employee.group)) return next();
    return next(
      new AppError("You are not authorized to access this end point", 401)
    );
  });
};
// To check if the Email is exist
const checkEmail = catchError(async (req, res, next) => {
  let isExist = await Employee.findOne({ email: req.body.email });
  if (isExist) return next(new AppError("Email already exists", 400));
  next();
});
export { protectedRoutes, allowedTo, checkEmail };
