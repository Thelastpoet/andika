import { createParser } from "eventsource-parser";

const API_BASE_URL = 'https://api.openai.com/v1/';

class AndikaOpenAI {
  constructor(options) {
    this.apiKey = options.api_key;
    this.model = options.model;
    this.temperature = parseFloat(options.temperature);
    this.max_tokens = parseInt(options.maxTokens, 10);
    this.top_p = parseFloat(options.topP);
    this.frequency_penalty = parseFloat(options.frequencyPenalty);
    this.presence_penalty = parseFloat(options.presencePenalty);
    this.stream = options.stream === "1" ? true : false;
  }

  get_api_url() {
    if (this.model === 'gpt-3.5-turbo' || this.model === 'gpt-4') {
      return `${API_BASE_URL}chat/completions`;
    } else {
      return `${API_BASE_URL}completions`;
    }
  }

  async andikaText(prompt, callback, options = {}) {
    const url = this.get_api_url();

    const body = {
      model: this.model,
      temperature: this.temperature,
      max_tokens: this.max_tokens,
      top_p: this.top_p,
      frequency_penalty: this.frequency_penalty,
      presence_penalty: this.presence_penalty,
      stream: this.stream,
      n: 1,
      ...options,
    };

    if (this.model === 'gpt-3.5-turbo' || this.model === 'gpt-4') {
      body.messages = [{role:'user', content:prompt}];
    } else {
      body.prompt = prompt;
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        // Log the error response
        const errorData = await response.json();
        console.error('Error response from OpenAI API:', errorData);
        throw new Error(response.statusText);
      }

      const parser = createParser(callback)
      const reader = response.body.getReader();
      const decoder = new TextDecoder();        

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        parser.feed(decoder.decode(value));
      }
    } catch (error) {
      console.error('Error generating text:', error);
      return 'Error generating text! Check your API Key?';
    }
  }
}

export default AndikaOpenAI;
