const core = require('@actions/core');
const github = require('@actions/github');
import isEqual from 'lodash';

try {
  // `left` input defined in action metadata file
  const left = core.getInput('left');
  const left_json = JSON.parse(left);

  // `right` input defined in action metadata file
  const right = core.getInput('right');
  const right_json = JSON.parse(right);
  
  core.setOutput("diff", isEqual(left_json, right_json));

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}
