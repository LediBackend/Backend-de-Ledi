import { Request, Response } from 'express';
import axios from 'axios';

export const forwardRequest = async (req: Request, res: Response, targetBaseUrl: string) => {
    try {
        const method = req.method.toLowerCase();
        const path = req.originalUrl.replace('/api', '');
        const url = `${targetBaseUrl}${path}`;

        const { host, 'content-length': _, ...safeHeaders } = req.headers;

        console.log(`[Gateway] Forwarding: ${method.toUpperCase()} → ${url}`);

        const response = await axios({
            method,
            url,
            data: req.body,
            withCredentials: true,
            headers: {
                ...safeHeaders,
                // Asegúrate de reenviar las cookies recibidas del cliente
                Cookie: req.headers.cookie || '',
            },
            timeout: 15000,
        });


        if (response.headers['set-cookie']) {
            res.setHeader('set-cookie', response.headers['set-cookie']);
        }

        // Enviar la respuesta
        res.status(response.status).send(response.data);
    } catch (error: any) {
        console.error('Error en el Gateway:', error?.message || error);
        res.status(error?.response?.status || 500).json({
            message: 'Error desde el API Gateway',
            details: error?.response?.data || error.message,
        });
    }
};
