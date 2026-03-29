/**
 * Task scheduler — manages workflow triggers.
 *
 * Supports:
 *   - cron triggers via node-cron
 *   - event triggers via an in-process EventEmitter
 *   - manual triggers via scheduler.trigger(workflowName, payload)
 */

import { EventEmitter } from 'events';
import cron from 'node-cron';

export class Scheduler extends EventEmitter {
  constructor() {
    super();
    this._cronJobs = new Map();  // workflowName -> cron.ScheduledTask
    this._workflows = new Map(); // workflowName -> workflow definition
  }

  /**
   * Register a workflow with the scheduler.
   * Sets up cron or event listeners based on the trigger type.
   * @param {object} workflow
   * @param {function} runFn  — async (workflow, triggerPayload) => void
   */
  register(workflow, runFn) {
    const { name, trigger } = workflow;
    this._workflows.set(name, { workflow, runFn });

    if (trigger.type === 'cron') {
      if (!cron.validate(trigger.cron)) {
        throw new Error(`Invalid cron expression for workflow "${name}": ${trigger.cron}`);
      }
      const job = cron.schedule(trigger.cron, () => {
        console.log(`[Scheduler] Cron trigger fired for workflow: ${name}`);
        runFn(workflow, { triggeredAt: new Date().toISOString() }).catch(err =>
          console.error(`[Scheduler] Workflow "${name}" failed:`, err)
        );
      }, { scheduled: false });
      this._cronJobs.set(name, job);
    }

    if (trigger.type === 'event') {
      this.on(trigger.event, (payload) => {
        console.log(`[Scheduler] Event "${trigger.event}" triggered workflow: ${name}`);
        runFn(workflow, payload).catch(err =>
          console.error(`[Scheduler] Workflow "${name}" failed:`, err)
        );
      });
    }
  }

  /**
   * Start all cron jobs.
   */
  start() {
    for (const [name, job] of this._cronJobs) {
      job.start();
      console.log(`[Scheduler] Started cron job for workflow: ${name}`);
    }
  }

  /**
   * Stop all cron jobs.
   */
  stop() {
    for (const [name, job] of this._cronJobs) {
      job.stop();
      console.log(`[Scheduler] Stopped cron job for workflow: ${name}`);
    }
  }

  /**
   * Manually trigger a workflow by name.
   * @param {string} workflowName
   * @param {object} payload
   */
  async trigger(workflowName, payload = {}) {
    const entry = this._workflows.get(workflowName);
    if (!entry) {
      throw new Error(`No workflow registered with name: "${workflowName}"`);
    }
    console.log(`[Scheduler] Manual trigger for workflow: ${workflowName}`);
    return entry.runFn(entry.workflow, payload);
  }

  /**
   * Emit an event to trigger all matching event-based workflows.
   * @param {string} eventName
   * @param {object} payload
   */
  emitEvent(eventName, payload = {}) {
    console.log(`[Scheduler] Emitting event: ${eventName}`);
    this.emit(eventName, payload);
  }
}

export const scheduler = new Scheduler();
