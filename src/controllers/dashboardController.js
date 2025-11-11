import dashboardService from '../services/dashboardService.js';

export const getStatistics = async (req, res) => {
    try {
        const statistics = await dashboardService.getStatistics?.();
        res.status(200).json({
            message: 'Statistics retrieved successfully',
            data: statistics,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving statistics',
            error: error.message,
        });
    }
};

export const getSystemStatistics = async (req, res) => {
    try {
        const systemStatistics = await dashboardService.getSystemStatistics?.();
        res.status(200).json({
            message: 'System statistics retrieved successfully',
            data: systemStatistics,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving system statistics',
            error: error.message,
        });
    }
};