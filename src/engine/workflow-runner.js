/**
 * Workflow runner — executes workflow steps sequentially.
 *
 * Handles step types:
 *   llm       — calls Claude with interpolated prompt, stores output
 *   action    — dispatches to a registered action handler
 *   condition — evaluates a JS expression to decide branch
 *   transform — runs a simple JS transform on context variables
 *
 * Execution context is passed through steps so each step can reference
 * outputs from prior steps via {{steps.<stepId>.output}}.
 */

import { ClaudeClient } from '../llm/claude-client.js';
import { interpolate } from '../workflows/schema.js';

export class WorkflowRunner {
  constructor(options = {}) {
    this.llm = options.llmClient ?? new ClaudeClient();
    this._actions = new Map();
  }

  /**
   * Register a named action handler.
   * @param {string} name  e.g. "email.send"
   * @param {function} handler  async (params, context) => result
   */
  registerAction(name, handler) {
    this._actions.set(name, handler);
  }

  /**
   * Execute a workflow with the given trigger payload.
   * @param {object} workflow
   * @param {object} triggerPayload
   * @returns {Promise<object>} final execution context
   */
  async run(workflow, triggerPayload = {}) {
    const runId = `${workflow.name}-${Date.now()}`;
    console.log(`\n[Runner] Starting workflow: "${workflow.name}" (run: ${runId})`);

    const context = {
      runId,
      workflowName: workflow.name,
      trigger: triggerPayload,
      steps: {},
    };

    for (const step of workflow.steps) {
      console.log(`[Runner]   Step [${step.id}] type=${step.type}`);
      try {
        const output = await this._executeStep(step, context);
        context.steps[step.id] = { output };
        console.log(`[Runner]   Step [${step.id}] completed.`);
      } catch (err) {
        console.error(`[Runner]   Step [${step.id}] FAILED:`, err.message);
        context.steps[step.id] = { error: err.message };
        if (!step.continueOnError) throw err;
      }
    }

    console.log(`[Runner] Workflow "${workflow.name}" finished.\n`);
    return context;
  }

  async _executeStep(step, context) {
    switch (step.type) {
      case 'llm':
        return this._runLlmStep(step, context);
      case 'action':
        return this._runActionStep(step, context);
      case 'condition':
        return this._runConditionStep(step, context);
      case 'transform':
        return this._runTransformStep(step, context);
      default:
        throw new Error(`Unknown step type: ${step.type}`);
    }
  }

  async _runLlmStep(step, context) {
    const prompt = interpolate(step.prompt, context);
    const systemPrompt = step.systemPrompt ? interpolate(step.systemPrompt, context) : undefined;
    return this.llm.complete(prompt, { systemPrompt, model: step.model, maxTokens: step.maxTokens });
  }

  async _runActionStep(step, context) {
    const handler = this._actions.get(step.action);
    if (!handler) throw new Error(`No action registered: "${step.action}"`);
    const params = this._interpolateParams(step.params ?? {}, context);
    return handler(params, context);
  }

  _runConditionStep(step, context) {
    // Evaluate a simple JS expression with context in scope
    const fn = new Function('context', `with(context) { return !!(${step.expression}); }`);
    const result = fn(context);
    return Promise.resolve(result);
  }

  _runTransformStep(step, context) {
    const fn = new Function('context', `with(context) { return (${step.expression}); }`);
    return Promise.resolve(fn(context));
  }

  _interpolateParams(params, context) {
    const result = {};
    for (const [key, value] of Object.entries(params)) {
      result[key] = typeof value === 'string' ? interpolate(value, context) : value;
    }
    return result;
  }
}

export const runner = new WorkflowRunner();
