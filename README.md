# GTA SMB AI Automation Engine

Core AI automation platform for small businesses in the Greater Toronto Area.

## What it does

Lets business owners define automation workflows in YAML. Workflows run on schedules, in response to events, or on demand. Each workflow can call Claude AI to generate content, then trigger actions like sending emails.

## Quick start

```bash
npm install
# set your API key
export ANTHROPIC_API_KEY=sk-...

# Run the email auto-reply demo
npm run demo

# Run unit tests (no API key needed)
npm test

# Start the engine (loads all workflows, starts cron jobs)
npm start
```

## Architecture

```
src/
  engine/
    automation-engine.js  — top-level orchestrator
    scheduler.js          — cron + event trigger management
    workflow-runner.js    — step-by-step workflow execution
  llm/
    claude-client.js      — Claude API wrapper
  workflows/
    schema.js             — workflow definition format & template interpolation
    loader.js             — YAML file loading & validation
  demo/
    email-auto-reply.js   — end-to-end demo
  index.js                — main entry point
  test-runner.js          — unit tests

workflows/
  email-auto-reply.yaml   — sample: auto-reply to customer inquiries
```

## Workflow format

```yaml
name: "My Workflow"
description: "What this workflow does"

trigger:
  type: event          # event | cron | manual
  event: email.received

steps:
  - id: draft
    type: llm
    systemPrompt: "You are a helpful assistant..."
    prompt: "Customer asked: {{trigger.email.body}}\n\nWrite a reply:"

  - id: send
    type: action
    action: email.send
    params:
      to: "{{trigger.email.from}}"
      subject: "Re: {{trigger.email.subject}}"
      body: "{{steps.draft.output}}"
```

### Step types

| Type        | Description                                        |
|-------------|----------------------------------------------------|
| `llm`       | Calls Claude with a prompt, stores text output     |
| `action`    | Runs a registered action handler (e.g. send email) |
| `condition` | Evaluates a JS expression, returns true/false      |
| `transform` | Runs a JS expression to transform data             |

### Template variables

Use `{{path.to.value}}` in prompts, system prompts, and action params:

- `{{trigger.*}}` — trigger payload (e.g. `{{trigger.email.from}}`)
- `{{steps.<id>.output}}` — output from a previous step

## Registering custom actions

```js
engine.registerAction('sms.send', async (params, context) => {
  await twilioClient.messages.create({ to: params.to, body: params.body });
  return { success: true };
});
```
