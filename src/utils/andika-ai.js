import { __ } from '@wordpress/i18n';

export async function generateText(prompt) {
    const apiUrl = `${andika.rest_url}andika/v1/andika-ai`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': andika.api_nonce,
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error(__('Error generating text. Please check your API key and settings.', 'andika'));
        }

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.generated_text || '';
        }
        
    } catch (error) {
        throw new Error(__('Error generating text. Please check your API key and settings.', 'andika'));
    }
}
