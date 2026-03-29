/**
 * Basic test runner — validates core components without an API key.
 * Tests: workflow schema validation, interpolation, scheduler, runner wiring.
 *
 * Run: node src/test-runner.js
 */

import { validateWorkflow, interpolate } from './workflows/schema.js';
import { Scheduler } from './engine/scheduler.js';
import { WorkflowRunner } from './engine/workflow-runner.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message ?? 'Assertion failed');
}

// --- Schema validation tests ---
console.log('\nWorkflow schema validation:');

test('valid workflow passes', () => {
  const { valid } = validateWorkflow({
    name: 'Test',
    trigger: { type: 'manual' },
    steps: [{ id: 's1', type: 'llm', prompt: 'Hello' }],
  });
  assert(valid);
});

test('missing name fails', () => {
  const { valid, errors } = validateWorkflow({
    trigger: { type: 'manual' },
    steps: [{ id: 's1', type: 'llm', prompt: 'x' }],
  });
  assert(!valid);
  assert(errors.some(e => e.includes('name')));
});

test('invalid trigger type fails', () => {
  const { valid } = validateWorkflow({
    name: 'T',
    trigger: { type: 'webhook' },
    steps: [{ id: 's1', type: 'llm', prompt: 'x' }],
  });
  assert(!valid);
});

test('cron trigger without expression fails', () => {
  const { valid } = validateWorkflow({
    name: 'T',
    trigger: { type: 'cron' },
    steps: [{ id: 's1', type: 'llm', prompt: 'x' }],
  });
  assert(!valid);
});

// --- Interpolation tests ---
console.log('\nTemplate interpolation:');

test('replaces flat variable', () => {
  const result = interpolate('Hello {{name}}!', { name: 'World' });
  assert(result === 'Hello World!');
});

test('replaces nested path', () => {
  const result = interpolate('From: {{trigger.email.from}}', {
    trigger: { email: { from: 'test@example.com' } },
  });
  assert(result === 'From: test@example.com');
});

test('leaves missing vars intact', () => {
  const result = interpolate('{{missing}}', {});
  assert(result === '{{missing}}');
});

test('replaces steps output', () => {
  const result = interpolate('Reply: {{steps.draft.output}}', {
    steps: { draft: { output: 'Hello!' } },
  });
  assert(result === 'Reply: Hello!');
});

// --- Scheduler tests ---
console.log('\nScheduler:');

test('registers and manually triggers workflow', async () => {
  const scheduler = new Scheduler();
  let triggered = false;
  scheduler.register(
    { name: 'T', trigger: { type: 'manual' } },
    async () => { triggered = true; }
  );
  await scheduler.trigger('T', {});
  assert(triggered, 'workflow should have been triggered');
});

test('emits events to event-triggered workflows', () => {
  const scheduler = new Scheduler();
  let triggered = false;
  scheduler.register(
    { name: 'E', trigger: { type: 'event', event: 'test.event' } },
    async () => { triggered = true; }
  );
  scheduler.emitEvent('test.event', {});
  assert(triggered);
});

// --- WorkflowRunner tests ---
console.log('\nWorkflowRunner:');

test('runs action step with registered handler', async () => {
  const runner = new WorkflowRunner();
  let actionCalled = false;
  runner.registerAction('test.action', async (params) => {
    actionCalled = true;
    return { ok: true };
  });
  await runner.run({
    name: 'ActionTest',
    trigger: { type: 'manual' },
    steps: [{ id: 's1', type: 'action', action: 'test.action', params: {} }],
  }, {});
  assert(actionCalled);
});

test('passes interpolated params to action', async () => {
  const runner = new WorkflowRunner();
  let receivedParams;
  runner.registerAction('capture', async (params) => { receivedParams = params; });
  await runner.run({
    name: 'InterpolateTest',
    trigger: { type: 'manual' },
    steps: [{
      id: 's1',
      type: 'action',
      action: 'capture',
      params: { greeting: 'Hello {{trigger.name}}' },
    }],
  }, { name: 'Alice' });
  assert(receivedParams?.greeting === 'Hello Alice');
});

test('propagates step output to context', async () => {
  const runner = new WorkflowRunner();
  let contextSeen;
  runner.registerAction('first', async () => 'step-one-result');
  runner.registerAction('second', async (params, ctx) => { contextSeen = ctx; });
  await runner.run({
    name: 'ContextTest',
    trigger: { type: 'manual' },
    steps: [
      { id: 'first', type: 'action', action: 'first', params: {} },
      { id: 'second', type: 'action', action: 'second', params: {} },
    ],
  }, {});
  assert(contextSeen?.steps?.first?.output === 'step-one-result');
});

// --- Summary ---
console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
