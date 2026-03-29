/**
 * Workflow definition schema and validator.
 *
 * A workflow is a YAML (or JS object) with this structure:
 *
 * name: "Email Auto-Reply"
 * description: "Automatically reply to customer inquiries using AI"
 * trigger:
 *   type: event | cron | manual
 *   event: "email.received"        # for event triggers
 *   cron: "0 * * * *"             # for cron triggers
 * steps:
 *   - id: draft_reply
 *     type: llm
 *     model: claude-sonnet-4-6     # optional
 *     systemPrompt: |
 *       You are a helpful customer service agent...
 *     prompt: |
 *       Customer email: {{trigger.email.body}}
 *       Write a professional reply.
 *     outputVar: reply_text
 *   - id: send_email
 *     type: action
 *     action: email.send
 *     params:
 *       to: "{{trigger.email.from}}"
 *       subject: "Re: {{trigger.email.subject}}"
 *       body: "{{steps.draft_reply.output}}"
 */

export const TRIGGER_TYPES = ['event', 'cron', 'manual'];
export const STEP_TYPES = ['llm', 'action', 'condition', 'transform'];

/**
 * Validate a workflow definition object.
 * @param {object} workflow
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateWorkflow(workflow) {
  const errors = [];

  if (!workflow.name) errors.push('workflow.name is required');
  if (!workflow.trigger) errors.push('workflow.trigger is required');
  if (!workflow.steps || !Array.isArray(workflow.steps) || workflow.steps.length === 0) {
    errors.push('workflow.steps must be a non-empty array');
  }

  if (workflow.trigger) {
    if (!TRIGGER_TYPES.includes(workflow.trigger.type)) {
      errors.push(`trigger.type must be one of: ${TRIGGER_TYPES.join(', ')}`);
    }
    if (workflow.trigger.type === 'cron' && !workflow.trigger.cron) {
      errors.push('trigger.cron expression is required for cron triggers');
    }
    if (workflow.trigger.type === 'event' && !workflow.trigger.event) {
      errors.push('trigger.event name is required for event triggers');
    }
  }

  (workflow.steps ?? []).forEach((step, i) => {
    if (!step.id) errors.push(`steps[${i}].id is required`);
    if (!STEP_TYPES.includes(step.type)) {
      errors.push(`steps[${i}].type must be one of: ${STEP_TYPES.join(', ')}`);
    }
    if (step.type === 'llm' && !step.prompt) {
      errors.push(`steps[${i}] (llm): prompt is required`);
    }
    if (step.type === 'action' && !step.action) {
      errors.push(`steps[${i}] (action): action name is required`);
    }
  });

  return { valid: errors.length === 0, errors };
}

/**
 * Interpolate template variables in a string.
 * Replaces {{varPath}} with values from the context object.
 * @param {string} template
 * @param {object} context  — flat or nested object
 * @returns {string}
 */
export function interpolate(template, context) {
  return template.replace(/\{\{([^}]+)\}\}/g, (_, path) => {
    const value = path.trim().split('.').reduce((obj, key) => obj?.[key], context);
    return value !== undefined ? String(value) : `{{${path}}}`;
  });
}
