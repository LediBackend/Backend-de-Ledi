import { Request, Response } from 'express';
import axios from 'axios';

export const forwardRequest = async (req: Request, res: Response, targetBaseUrl: string) => {
    try {
        const method = req.method.toLowerCase();
        let path = req.originalUrl.replace('/api', '');


        const url = `${targetBaseUrl}${path}`;
        const { host, 'content-length': _, ...safeHeaders } = req.headers;

        console.log(`[Gateway] Forwarding: ${method.toUpperCase()} → ${url}`);

        const response = await axios({
            method,
            url,
            data: ['get', 'delete', 'put', 'post'].includes(method) ? undefined : req.body,
            headers: safeHeaders,
            timeout: 15000,
        });

        // Enviar la respuesta sin forzar JSON
        res.status(response.status).send(response.data);
    } catch (error: any) {
        console.error('Error en el Gateway:', error.message);
        res.status(error?.response?.status || 500).json({
            message: 'Error desde el API Gateway',
            details: error?.response?.data || error.message,
        });
    }
};
