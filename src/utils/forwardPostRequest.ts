import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import { Multer } from 'multer';

// Extendemos la Request para incluir archivos
declare global {
    namespace Express {
        interface Request {
            files?: { [fieldname: string]: Multer.File[] } | Multer.File[] | undefined;
        }
    }
}

export const forwardPostRequest = async (req: Request, res: Response, targetBaseUrl: string): Promise<void> => {
    try {
        const method = req.method.toLowerCase();
        const path = req.originalUrl.replace('/api', '');
        const url = `${targetBaseUrl}${path}`;

        const contentType = req.headers['content-type'] || '';
        const { host, 'content-length': _, ...safeHeaders } = req.headers;

        if (req.headers.cookie) {
            safeHeaders['Cookie'] = req.headers.cookie;
        }



        let axiosConfig: any = {
            method,
            url,
            headers: { ...safeHeaders },
            timeout: 15000,
            params: req.query,
            withCredentials: true,
            validateStatus: () => true,
            responseType: 'json',
        };

        if (contentType.includes('multipart/form-data')) {
            // Si es multipart/form-data, reenviamos el request como stream
            axiosConfig.data = req;
            axiosConfig.headers = {
                ...safeHeaders,
                'Content-Type': contentType,
            };
            axiosConfig.maxBodyLength = Infinity;
        } else {
            // Para application/json o x-www-form-urlencoded
            axiosConfig.data = req.body;

            // Aseguramos que se envíe como JSON
            axiosConfig.headers['Content-Type'] = 'application/json';
        }

        const response = await axios(axiosConfig);

        // Propagamos todos los headers, incluidas cookies
        for (const [header, value] of Object.entries(response.headers)) {
            if (header.toLowerCase() === 'set-cookie') {
                res.setHeader('set-cookie', value as string[]);
            } else {
                res.setHeader(header, value as string);
            }
        }

        // Reenvío correcto de la respuesta
        console.log(`[Gateway] Respuesta del microservicio (${response.status}):`, response.data);

        res.status(response.status).json(response.data);

    } catch (error: any) {
        console.error('[Gateway Error]', error.message);

        res.status(error?.response?.status || 500).json({
            message: 'Error desde el API Gateway',
            details: error?.response?.data || error.message,
        });
        return;
    }
};


