import { registerSchema, loginSchema } from './auth.validation.js';
import { registerEmployee, loginEmployee } from './auth.service.js';

export async function register(req, res) {
  const data = registerSchema.parse(req.body);
  const employee = await registerEmployee(data);

  res.status(201).json({
    success: true,
    message: 'Employee registered successfully.',
    data: employee,
  });
}

export async function login(req, res) {
  const data = loginSchema.parse(req.body);
  const result = await loginEmployee(data);

  res.status(200).json({
    success: true,
    message: 'Login successful.',
    data: result,
  });
}
