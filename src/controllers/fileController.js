import express from 'express';
import fileStorage from '../utils/fileStorage.js';
import ResponseHelper, { ErrorResponseObject } from '../utils/responseHelper.js';

const router = express.Router();

// Upload file attachment
router.post('/:id/lampiran', async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.files.file; // Assuming you're using a middleware like express-fileupload

        if (!file) {
            return res.status(400).json(ErrorResponseObject('File not found'));
        }

        const result = await fileStorage.uploadFile?.(id, file) || null;
        return res.status(201).json({ message: 'Lampiran berhasil di-upload', data: result });
    } catch (error) {
        return res.status(500).json(new ErrorResponse('Failed to upload file'));
    }
});

// Download file attachment
router.get('/:id/lampiran/:fileId', async (req, res) => {
    try {
        const { id, fileId } = req.params;
        const file = await fileStorage.downloadFile(id, fileId);

        if (!file) {
            return res.status(404).json(ErrorResponseObject('File lampiran tidak ditemukan'));
        }

        res.download(file.path); // Assuming file.path contains the path to the file
    } catch (error) {
        return res.status(500).json(new ErrorResponse('Failed to download file'));
    }
});

export default router;