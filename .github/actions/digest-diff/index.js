const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `left` input defined in action metadata file
  const left = core.getInput('left');
  const left_json = JSON.parse(left);

  // `right` input defined in action metadata file
  const right = core.getInput('right');
  const right_json = JSON.parse(right);

  diff = true;
  for (var i = 0; i < left_json.length; i++){
    for (var j = 0; j < right_json.length; j++){
        if (left_json[i].platform === right_json[j].platform) {
            if (left_json[i].digest === right_json[j].digest) {
            console.log(right_json[j].platform);
            break;
        }
        diff = false;
    }
  }
  
  core.setOutput("diff", false);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}
