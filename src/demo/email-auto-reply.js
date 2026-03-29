/**
 * Demo: Email Auto-Reply
 *
 * Simulates a customer inquiry email arriving and being automatically
 * replied to by the AI automation engine.
 *
 * Run: node src/demo/email-auto-reply.js
 * Requires: ANTHROPIC_API_KEY env variable set
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AutomationEngine } from '../engine/automation-engine.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workflowsDir = join(__dirname, '../../workflows');

// --- Simulated email store (in-memory) ---
const sentEmails = [];

function emailSendHandler(params) {
  console.log('\n📧 Email sent!');
  console.log('  To:     ', params.to);
  console.log('  Subject:', params.subject);
  console.log('  Body:\n');
  console.log(params.body.split('\n').map(l => '    ' + l).join('\n'));
  sentEmails.push(params);
  return { success: true, messageId: `msg-${Date.now()}` };
}

// --- Simulated inbound email ---
const inboundEmail = {
  from: 'maria.gonzalez@example.com',
  subject: 'Question about your catering services',
  body: `Hi there,

I'm planning a corporate lunch for about 25 people on April 15th.
Do you offer vegetarian and gluten-free options? Also, what's your pricing
for a buffet-style setup? We'd like delivery to our office in downtown Toronto.

Thanks,
Maria`,
};

async function main() {
  console.log('=== GTA SMB AI Automation Engine — Email Auto-Reply Demo ===\n');

  const engine = new AutomationEngine({ workflowsDir });

  // Register the email.send action (in production, would use an email API)
  engine.registerAction('email.send', emailSendHandler);

  // Load all workflow definitions from /workflows/
  engine.loadWorkflows();

  // Start the engine (activates cron jobs if any)
  engine.start();

  console.log('\n--- Simulating inbound email ---');
  console.log('From:   ', inboundEmail.from);
  console.log('Subject:', inboundEmail.subject);
  console.log('Body:\n');
  console.log(inboundEmail.body.split('\n').map(l => '  ' + l).join('\n'));
  console.log('\n--- Processing workflow ---\n');

  // Emit the event, which triggers the "Email Auto-Reply" workflow
  engine.emitEvent('email.received', { email: inboundEmail });

  // Give async handlers a moment to complete (event-based triggers are async)
  await new Promise(resolve => setTimeout(resolve, 30000));

  engine.stop();

  console.log('\n=== Demo complete ===');
  console.log(`Total emails sent: ${sentEmails.length}`);
}

main().catch(err => {
  console.error('Demo failed:', err);
  process.exit(1);
});
