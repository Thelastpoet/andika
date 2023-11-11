import OpenAI from 'openai';

class AndikaOpenAI {
  constructor(options) {
    this.openai = new OpenAI({
      apiKey: options.api_key,
    });
    this.model = options.model;
    this.temperature = parseFloat(options.temperature);
    this.top_p = parseFloat(options.topP);
    this.frequency_penalty = parseFloat(options.frequencyPenalty);
    this.presence_penalty = parseFloat(options.presencePenalty);
    this.stream = options.stream === "1" ? true : false;
  }

  async andikaText(prompt, options = {}) {
    const body = {
      model: this.model,
      temperature: this.temperature,
      top_p: this.top_p,
      frequency_penalty: this.frequency_penalty,
      presence_penalty: this.presence_penalty,
      stream: this.stream,
      n: 1,
      max_tokens: options.max_tokens,
      ...options,
      messages: [{role:'user', content:prompt}]
    };

    try {
      const response = await this.openai.createChatCompletion(body);
      if (response.data) {
        return response.data.choices[0].message.content.trim();
      }
    } catch (error) {
      console.error('Error generating text:', error);
      return 'Error generating text! Check your API Key?';
    }
  }
}

export default AndikaOpenAI;
