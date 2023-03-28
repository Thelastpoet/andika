const generateText = async (attributes, postTitle, previousContent, setAttributes, setIsLoading) => {
    setIsLoading(true);

    let prompt = '';

    if (!attributes.content && postTitle) {
        prompt = `Title: ${postTitle}\n\nContinue the article based on the title:`;
    } else {
        const lastSentences = attributes.content.match(/[^\.!\?]+[\.!\?]+/g).slice(-3).join(' ');
        prompt = `Title: ${postTitle}\n\n${previousContent}\n\n${lastSentences}\n\nContinue the article based on the title and the last sentences:`;
    }

    const response = await fetch(andika.api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': andika.api_nonce,
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 300,
        }),
    });

    const responseData = await response.json();

    const newContent = attributes.content + responseData.generated_text;
    setAttributes({ content: newContent });

    setIsLoading(false);
};

export default generateText;