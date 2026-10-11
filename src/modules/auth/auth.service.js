import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma.js';
import env from '../../config/env.js';
import { HttpError } from '../../utils/http-error.js';

export async function registerEmployee({ name, email, password }) {
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await prisma.employee.findUnique({
    where: { email: normalizedEmail },
  });
  if (existing) {
    throw new HttpError(409, 'An account with this email already exists.');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const employee = await prisma.employee.create({
    data: {
      name,
      email: normalizedEmail,
      passwordHash,
    },
  });

  const { passwordHash: _, ...safeEmployee } = employee;
  return safeEmployee;
}

export async function loginEmployee({ email, password }) {
  const normalizedEmail = email.toLowerCase().trim();

  const employee = await prisma.employee.findUnique({
    where: { email: normalizedEmail },
  });

  if (!employee) {
    throw new HttpError(401, 'Invalid email or password.');
  }

  const isPasswordValid = await bcrypt.compare(password, employee.passwordHash);
  if (!isPasswordValid) {
    throw new HttpError(401, 'Invalid email or password.');
  }

  const token = jwt.sign({ sub: employee.id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  const { passwordHash: _, ...safeEmployee } = employee;
  return {
    token,
    employee: safeEmployee,
  };
}
