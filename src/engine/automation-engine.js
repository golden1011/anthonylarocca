/**
 * AutomationEngine — top-level orchestrator.
 *
 * Ties together: Scheduler + WorkflowRunner + workflow loading.
 * Entry point for the application.
 *
 * Usage:
 *   const engine = new AutomationEngine({ workflowsDir: './workflows' });
 *   engine.registerAction('email.send', emailSendHandler);
 *   await engine.start();
 *   await engine.trigger('Email Auto-Reply', { email: { from: '...', body: '...' } });
 */

import { Scheduler } from './scheduler.js';
import { WorkflowRunner } from './workflow-runner.js';
import { loadWorkflowsFromDir, loadWorkflow } from '../workflows/loader.js';

export class AutomationEngine {
  constructor(options = {}) {
    this.scheduler = new Scheduler();
    this.runner = new WorkflowRunner({ llmClient: options.llmClient });
    this.workflowsDir = options.workflowsDir;
    this._loaded = false;
  }

  /**
   * Register a named action handler (delegated to runner).
   */
  registerAction(name, handler) {
    this.runner.registerAction(name, handler);
    return this;
  }

  /**
   * Load a single workflow file.
   */
  loadWorkflow(filePath) {
    const workflow = loadWorkflow(filePath);
    this._registerWorkflow(workflow);
    return this;
  }

  /**
   * Load all workflows from the configured directory.
   */
  loadWorkflows() {
    if (!this.workflowsDir) throw new Error('workflowsDir is not set');
    const workflows = loadWorkflowsFromDir(this.workflowsDir);
    for (const workflow of workflows) {
      this._registerWorkflow(workflow);
    }
    this._loaded = true;
    return this;
  }

  /**
   * Start cron scheduling.
   */
  start() {
    this.scheduler.start();
    console.log('[Engine] AutomationEngine started.');
    return this;
  }

  /**
   * Stop cron scheduling.
   */
  stop() {
    this.scheduler.stop();
    console.log('[Engine] AutomationEngine stopped.');
    return this;
  }

  /**
   * Manually trigger a named workflow.
   */
  async trigger(workflowName, payload = {}) {
    return this.scheduler.trigger(workflowName, payload);
  }

  /**
   * Emit an event (fires all matching event-triggered workflows).
   */
  emitEvent(eventName, payload = {}) {
    this.scheduler.emitEvent(eventName, payload);
    return this;
  }

  _registerWorkflow(workflow) {
    const runFn = (wf, payload) => this.runner.run(wf, payload);
    this.scheduler.register(workflow, runFn);
    console.log(`[Engine] Registered workflow: "${workflow.name}" (trigger: ${workflow.trigger.type})`);
  }
}
