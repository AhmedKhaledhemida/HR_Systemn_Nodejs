import { Employee } from "../../../Database/Employee.model.js";
import { AppError } from "../../Utils/appError.js";
import { catchError } from "../../Utils/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Attendance } from "../../../Database/attendance.model.js";
const Signup = catchError(async (req, res) => {
  req.body.group = "HR";
  let employee = new Employee(req.body);
  await employee.save();
  let token = jwt.sign(
    { employeeId: employee._id, name: employee.name, group: employee.group },
    process.env.JWT_KEY
  );
  res.status(200).json({ message: "Success", token });
});
const Signin = catchError(async (req, res, next) => {
  let employee = await Employee.findOne({ email: req.body.email, group: "HR" });
  if (!employee) return next(new AppError("HR only accepted", 404));
  else if (
    employee &&
    bcrypt.compareSync(req.body.password, employee.password)
  ) {
    let token = jwt.sign(
      { employeeId: employee._id, name: employee.name, group: employee.group },
      process.env.JWT_KEY
    );
    return res.status(200).json({ message: "Success", token });
  }

  return next(new AppError("Incorrect Email or Password", 401));
});
const addEmployee = catchError(async (req, res) => {
  req.body.group = "Normal Employee";
  req.body.password = "iVoiceUp";
  let employees = new Employee(req.body);

  await employees.save();
  res.status(200).json({ message: "Success", employees });
});
const editEmployee = catchError(async (req, res, next) => {
  if (!req.params.id)
    return next(new AppError("Employee ID is required ", 404));
  let employees = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!employees) return next(new AppError("Employee not found!", 404));
  res.status(200).json({ message: "Success", employees });
});

const getEmployee = catchError(async (req, res, next) => {
  let employees = await Employee.find({ group: "Normal Employee" });
  if (employees.length == 0)
    return next(new AppError("Thier is no Employees", 404));
  res.status(200).json({ message: "Success", employees });
});

const addAttendance = catchError(async (req, res, next) => {
  req.body.employee = req.params.id;
  let attendance = new Attendance(req.body);
  await attendance.save();
  res.status(200).json({ message: "Success", attendance });
});
const getAttendance = catchError(async (req, res, next) => {
  const attendanceRecords = await Attendance.find().populate(
    "employee",
    "name email"
  );

  if (attendanceRecords.length === 0) {
    return next(
      new AppError("No attendance records found for this employee", 404)
    );
  }

  res.status(200).json({
    message: "Success",
    attendance: attendanceRecords,
  });
});

export {
  Signup,
  Signin,
  addEmployee,
  editEmployee,
  getEmployee,
  addAttendance,
  getAttendance,
};
