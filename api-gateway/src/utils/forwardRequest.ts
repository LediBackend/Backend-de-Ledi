import { Request, Response } from 'express';
import axios from 'axios';

export const forwardRequest = async (req: Request, res: Response, targetBaseUrl: string) => {
    try {
        const method = req.method.toLowerCase();
        let path = req.originalUrl.replace('/api', '');
        const url = `${targetBaseUrl}${path}`;

        const { host, 'content-length': _, ...restHeaders } = req.headers;
        const safeHeaders = {
            ...restHeaders,
            authorization: req.headers.authorization || '',
            cookie: req.headers.cookie || '',
        };

        console.log(`[Gateway] Forwarding: ${method.toUpperCase()} → ${url}`);

        const response = await axios({
            method,
            url,
            data: req.body,
            headers: safeHeaders,
            timeout: 15000,
            withCredentials: true,
            validateStatus: () => true
        });

        // Enviar la respuesta del microservicio al cliente final
        if (!res.headersSent) {
            const setCookie = response.headers['set-cookie'];
            if (setCookie) {
                res.setHeader('set-cookie', setCookie);
            }

            res.status(response.status).send(response.data);
        }

    } catch (error: any) {
        console.error('Error en el Gateway:', error.message);

        // Verificar que no se haya enviado ya la respuesta
        if (!res.headersSent) {
            res.status(error?.response?.status || 500).json({
                message: 'Error desde el API Gateway',
                details: error?.response?.data || error.message,
            });
        }
    }
};
