import { createEnquirySchema, enquiryIdSchema } from './enquiry.validation.js';
import {
  createEnquiry,
  getPublicEnquiries,
  claimEnquiry,
  getMyEnquiries,
} from './enquiry.service.js';

export async function submitEnquiry(req, res) {
  const data = createEnquirySchema.parse(req.body);
  const enquiry = await createEnquiry(data);

  res.status(201).json({
    success: true,
    message: 'Enquiry submitted successfully.',
    data: enquiry,
  });
}

export async function listPublicEnquiries(req, res) {
  const enquiries = await getPublicEnquiries();

  res.status(200).json({
    success: true,
    message: 'Public enquiries retrieved successfully.',
    data: enquiries,
  });
}

export async function claimEnquiryHandler(req, res) {
  const enquiryId = enquiryIdSchema.parse(req.params.id);
  const enquiry = await claimEnquiry(enquiryId, req.employeeId);

  res.status(200).json({
    success: true,
    message: 'Enquiry claimed successfully.',
    data: enquiry,
  });
}

export async function listMyEnquiries(req, res) {
  const enquiries = await getMyEnquiries(req.employeeId);

  res.status(200).json({
    success: true,
    message: 'Your claimed enquiries retrieved successfully.',
    data: enquiries,
  });
}
