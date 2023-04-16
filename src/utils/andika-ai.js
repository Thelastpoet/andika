export async function generateText(prompt, stream = true, onProgress = null) {
    try {
        const response = await fetch(andika.api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': andika.api_nonce,
            },
            body: JSON.stringify({ prompt, stream: !!stream }),
        });

        if (!response.ok) {
            throw new Error(__('Error generating text. Please check your API key and settings.', 'andika'));
        }

        if (stream) {
            const reader = response.body.getReader();
            let result = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                const partialJson = new TextDecoder('utf-8').decode(value);
                const partialResult = JSON.parse(partialJson);
                const newText = partialResult.generated_text;
                result += newText;

                if (onProgress) {
                    onProgress(newText);
                }
            }

            return result;
        } else {
            const jsonResponse = await response.json();
            return jsonResponse.generated_text;
        }
    } catch (error) {
        throw new Error(__('Error generating text. Please check your API key and settings.', 'andika'));
    }
}
