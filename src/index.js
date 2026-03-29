/**
 * GTA SMB AI Automation Engine
 * Main entry point — loads all workflows and starts the engine.
 *
 * Usage: node src/index.js
 * For demo: node src/demo/email-auto-reply.js
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AutomationEngine } from './engine/automation-engine.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workflowsDir = join(__dirname, '../workflows');

const engine = new AutomationEngine({ workflowsDir });

// Register built-in action handlers
engine.registerAction('email.send', async (params) => {
  // TODO: integrate with real email provider (SendGrid, Resend, etc.)
  console.log('[Action] email.send — would send to:', params.to);
  return { success: true };
});

engine.loadWorkflows();
engine.start();

console.log('Automation engine running. Press Ctrl+C to stop.');

process.on('SIGINT', () => {
  engine.stop();
  process.exit(0);
});
