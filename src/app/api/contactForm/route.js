/* eslint-disable no-undef */
import { NextResponse } from 'next/server';

export async function POST(req) {
    let parsedBody = {};

    try {
        if (req.body instanceof ReadableStream) {
            const rawData = await req.body.getReader().read();
            parsedBody = JSON.parse(new TextDecoder().decode(rawData.value));
        } else {
            parsedBody = req.body;
        }

        const requiredFields = ["name", "company", "email", "subject", "message"];
        for (const field of requiredFields) {
            if (!parsedBody[field]) {
                return new NextResponse(400).json({
                    message: `Oops! You are missing the ${field} field, please fill it in and retry.`,
                });
            }
        }

        const endpoint = process.env.CONTACT_FORM_ENDPOINT;
        const apiKey = process.env.CONTACT_FORM_API_KEY;

        if (!endpoint || !apiKey) {
            console.log("Error de configuración del servidor.");
            return new NextResponse(500).json({
                message: "Server configuration error.",
            });
        }

        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(parsedBody),
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                charset: "utf-8",
            },
        });

        if (!response.ok) {
            console.log("Error al procesar la solicitud.");
            return new NextResponse(500).json({
                message: "There was an error processing your request. Please try again later.",
            });
        }

        console.log("Mensaje enviado con éxito.");
        return new NextResponse(200).json({
            message: "Success! Thank you for your message!",
        });
    } catch (err) {
        console.log("Error en el bloque try-catch:", err);
        return new NextResponse(500).json({
            message: "There was an unexpected error processing your request. Please try again later.",
        });
    }
}
