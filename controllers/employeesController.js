const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req.body?.lastname) {
    return res.status(400).json({
      message: 'First and last names are required',
    });
  }
  const newEmployee = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  try {
    const result = await Employee.create(newEmployee);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      message: 'ID parameter is required',
    });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  try {
    const result = await employee.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      message: 'ID parameter is required',
    });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  try {
    const result = await employee.deleteOne({ _id: req.body.id });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      message: 'ID parameter is required',
    });
  }
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
