import adminService from '../services/adminService.js';
import ResponseHelper, { SuccessResponse, ErrorResponseObject } from '../utils/responseHelper.js';

// Get all complaints
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await adminService.getAllComplaints?.();
        res.status(200).json(SuccessResponse(complaints));
    } catch (error) {
        res.status(500).json(ErrorResponseObject('Failed to retrieve complaints', error));
    }
};

// Get complaint details
export const getComplaintDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const complaint = await adminService.getComplaintDetails?.(id);
        if (!complaint) {
            return res.status(404).json(ErrorResponseObject('Complaint not found'));
        }
        res.status(200).json(SuccessResponse(complaint));
    } catch (error) {
        res.status(500).json(ErrorResponseObject('Failed to retrieve complaint details', error));
    }
};

// Validate complaint
export const validateComplaint = async (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;
    try {
        const updatedComplaint = await adminService.validateComplaint?.(id, status, notes);
        res.status(200).json(SuccessResponse(updatedComplaint));
    } catch (error) {
        res.status(400).json(ErrorResponseObject('Failed to validate complaint', error));
    }
};

// Respond to complaint
export const respondToComplaint = async (req, res) => {
    const { id } = req.params;
    const { notes } = req.body;
    try {
        const response = await adminService.respondToComplaint?.(id, notes);
        res.status(201).json(SuccessResponse(response));
    } catch (error) {
        res.status(400).json(ErrorResponseObject('Failed to respond to complaint', error));
    }
};