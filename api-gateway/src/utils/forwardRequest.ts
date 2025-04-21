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
            data: req.body,
            headers: {
                ...safeHeaders,
                // Asegura que se pasen las cookies del cliente al backend
                cookie: req.headers.cookie || '',
            },
            timeout: 15000,
            withCredentials: true,
            validateStatus: () => true
        });

        const setCookie = response.headers['set-cookie'];
        if (setCookie) {
            res.setHeader('set-cookie', setCookie);
        }

        res.status(response.status).send(response.data);
    } catch (error: any) {
        console.log(error);
        console.error('Error en el Gateway:', error.message);
        res.status(error?.response?.status || 500).json({
            message: 'Error desde el API Gateway',
            details: error?.response?.data || error.message,
        });
    }
};
