/**
 * Workflow loader — reads YAML workflow files from disk.
 */

import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import yaml from 'js-yaml';
import { validateWorkflow } from './schema.js';

/**
 * Load and validate a single workflow from a YAML file.
 * @param {string} filePath
 * @returns {object} validated workflow definition
 */
export function loadWorkflow(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const workflow = yaml.load(raw);
  const { valid, errors } = validateWorkflow(workflow);
  if (!valid) {
    throw new Error(`Invalid workflow in ${filePath}:\n  ${errors.join('\n  ')}`);
  }
  workflow._filePath = filePath;
  return workflow;
}

/**
 * Load all YAML workflows from a directory.
 * @param {string} dir
 * @returns {object[]} array of workflow definitions
 */
export function loadWorkflowsFromDir(dir) {
  const files = readdirSync(dir).filter(f => extname(f) === '.yaml' || extname(f) === '.yml');
  return files.map(f => loadWorkflow(join(dir, f)));
}
