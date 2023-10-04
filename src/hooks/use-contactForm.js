/* eslint-disable no-undef */
import { useState } from 'react';

const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://gastongenaud.com';

export default function useContactForm({ values, resetValues }) {
    const [loading, setLoading] = useState(false);
    const [outputMessage, setOutputMessage] = useState(null);
    const [error, setError] = useState(null);

    const { name, company, email, subject, message } = values;

    async function submitContactForm(e) {

        e.preventDefault();

        // Set base state
        setLoading(true);
        setError(null);
        setOutputMessage(null);

        // gathering data to be submitted to the serverless function
        const body = {
            name,
            company,
            email,
            subject,
            message,
        };

        const res = await fetch(`${server}/api/contactForm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        // Asegurándose de que la respuesta contiene JSON antes de intentar analizarla
        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const output = await res.json();

            // check if successful or if was an error
            if (res.status >= 400 && res.status < 600) {
                setLoading(false);
                setError(true);
                setOutputMessage(output.message);
            } else {
                setLoading(false);
                setOutputMessage(output.message);
                resetValues();
            }
        } else {
            setLoading(false);
            setError(true);
            setOutputMessage("Error: La respuesta del servidor no es un JSON válido.");
        }
    }

    return {
        error,
        loading,
        outputMessage,
        submitContactForm,
    };
}
