const generateText = async (attributes, setAttributes, setIsLoading) => {
    setIsLoading(true);

    const prompt = `Continue the article based on the current content: ${attributes.content}`;

    const response = await fetch(andika.api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': andika.api_nonce,
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: andika.max_tokens,
        }),
    });

    const responseData = await response.json();

    const newContent = attributes.content + responseData.generated_text;
    setAttributes({ content: newContent });

    setIsLoading(false);
};

export default generateText;