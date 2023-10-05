/* eslint-disable no-undef */
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const parsedBody = await parseRequestBody(req);
        verifyRequiredFields(parsedBody, ["name", "company", "email", "subject", "message"]);

        const { CONTACT_FORM_ENDPOINT, CONTACT_FORM_API_KEY } = process.env;
        verifyEnvironmentVariables(CONTACT_FORM_ENDPOINT, CONTACT_FORM_API_KEY);

        await makeExternalRequest(CONTACT_FORM_ENDPOINT, CONTACT_FORM_API_KEY, parsedBody);

        console.log("Mensaje enviado con éxito.");
        return new NextResponse(JSON.stringify({ message: "Success! Thank you for your message!" }), { status: 200 });

    } catch (err) {
        console.error("Error:", err.message);
        return new NextResponse(err.message || "There was an unexpected error processing your request. Please try again later.", { status: 500 });
    }
}

async function parseRequestBody(req) {
    if (req.body instanceof ReadableStream) {
        const rawData = await req.body.getReader().read();
        return JSON.parse(new TextDecoder().decode(rawData.value));
    }
    return req.body;
}

function verifyRequiredFields(parsedBody, requiredFields) {
    for (const field of requiredFields) {
        if (!parsedBody[field]) {
            throw new Error(`Oops! You are missing the ${field} field, please fill it in and retry.`);
        }
    }
}

function verifyEnvironmentVariables(endpoint, apiKey) {
    if (!endpoint || !apiKey) {
        throw new Error("Server configuration error.");
    }
}

async function makeExternalRequest(endpoint, apiKey, parsedBody) {
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
        throw new Error("Error al procesar la solicitud.");
    }
}