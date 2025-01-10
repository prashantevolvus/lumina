const { exec } = require('child_process');
const axios = require('axios');
const { WebClient } = require('@slack/web-api');
const { Octokit } = require('@octokit/rest');

const slackToken = process.env.SLACK_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL;
const githubToken = process.env.GITHUB_TOKEN;
const githubRepo = process.env.GITHUB_REPO;

const slackClient = new WebClient(slackToken);
const octokit = new Octokit({ auth: githubToken });

const sendSlackMessage = async (message) => {
  try {
    await slackClient.chat.postMessage({
      channel: slackChannel,
      text: message,
    });
    console.log('Slack message sent');
  } catch (error) {
    console.error('Error sending Slack message:', error);
  }
};

const createGithubIssue = async (title, body) => {
  try {
    await octokit.issues.create({
      owner: githubRepo.split('/')[0],
      repo: githubRepo.split('/')[1],
      title,
      body,
    });
    console.log('GitHub issue created');
  } catch (error) {
    console.error('Error creating GitHub issue:', error);
  }
};

const runShellCommand = (command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

module.exports = {
  sendSlackMessage,
  createGithubIssue,
  runShellCommand,
};
