import prisma from '../../lib/prisma.js';
import { HttpError } from '../../utils/http-error.js';

export async function createEnquiry({ name, email, courseInterest, phone, message }) {
  return prisma.enquiry.create({
    data: {
      name,
      email: email.toLowerCase().trim(),
      courseInterest,
      phone: phone || null,
      message: message || null,
    },
  });
}

export async function getPublicEnquiries() {
  return prisma.enquiry.findMany({
    where: { claimedById: null },
    orderBy: { createdAt: 'desc' },
  });
}

export async function claimEnquiry(enquiryId, employeeId) {
  const existing = await prisma.enquiry.findUnique({
    where: { id: enquiryId },
  });

  if (!existing) {
    throw new HttpError(404, 'Enquiry not found.');
  }

  if (existing.claimedById) {
    throw new HttpError(409, 'This enquiry has already been claimed.');
  }

  const result = await prisma.enquiry.updateMany({
    where: {
      id: enquiryId,
      claimedById: null,
    },
    data: {
      claimedById: employeeId,
    },
  });

  if (result.count === 0) {
    throw new HttpError(409, 'This enquiry has already been claimed.');
  }

  return prisma.enquiry.findUnique({
    where: { id: enquiryId },
  });
}

export async function getMyEnquiries(employeeId) {
  return prisma.enquiry.findMany({
    where: { claimedById: employeeId },
    orderBy: { createdAt: 'desc' },
  });
}
