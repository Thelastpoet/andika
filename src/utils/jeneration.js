const generateText = async (attributes, postTitle, previousContent, setAttributes, setIsLoading) => {
    setIsLoading(true);

    let prompt = '';

    if (!attributes.content && postTitle) {
        prompt = `Title: ${postTitle}\n\nContinue the article based on the title:`;
    } else {
        const lastParagraphs = attributes.content.match(/[^\\n]+\\n\\n/g);
        const lastParagraphsText = lastParagraphs ? lastParagraphs.slice(-3).join(' ') : '';
        const unfinishedParagraph = attributes.content.replace(lastParagraphsText, '').trim();
        prompt = `Title: ${postTitle}\n\n${previousContent}\n\n${lastParagraphsText}\n\n${unfinishedParagraph}\n\nContinue the article based on the title, the last paragraphs, and the current unfinished paragraph:`;
    }

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