/**
 * Claude API client — LLM integration layer.
 *
 * Wraps @anthropic-ai/sdk to provide a simple, workflow-friendly interface:
 *   - complete(prompt, options)  — single-turn completion
 *   - chat(messages, options)    — multi-turn conversation
 *
 * Configuration via environment variables:
 *   ANTHROPIC_API_KEY  — required
 *   CLAUDE_MODEL       — optional, defaults to claude-sonnet-4-6
 */

import Anthropic from '@anthropic-ai/sdk';

const DEFAULT_MODEL = 'claude-sonnet-4-6';
const DEFAULT_MAX_TOKENS = 1024;

export class ClaudeClient {
  constructor(options = {}) {
    this.client = new Anthropic({
      apiKey: options.apiKey ?? process.env.ANTHROPIC_API_KEY,
    });
    this.model = options.model ?? process.env.CLAUDE_MODEL ?? DEFAULT_MODEL;
    this.defaultMaxTokens = options.maxTokens ?? DEFAULT_MAX_TOKENS;
  }

  /**
   * Single-turn text completion.
   * @param {string} prompt
   * @param {object} options
   * @returns {Promise<string>} text response
   */
  async complete(prompt, options = {}) {
    const response = await this.client.messages.create({
      model: options.model ?? this.model,
      max_tokens: options.maxTokens ?? this.defaultMaxTokens,
      system: options.systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });
    return response.content[0].text;
  }

  /**
   * Multi-turn conversation.
   * @param {Array<{role: 'user'|'assistant', content: string}>} messages
   * @param {object} options
   * @returns {Promise<string>} assistant text response
   */
  async chat(messages, options = {}) {
    const response = await this.client.messages.create({
      model: options.model ?? this.model,
      max_tokens: options.maxTokens ?? this.defaultMaxTokens,
      system: options.systemPrompt,
      messages,
    });
    return response.content[0].text;
  }
}

export const claude = new ClaudeClient();
