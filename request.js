const express = require('express');
const app = express();
const request = require('request');

app.use(express.json());

app.post('/alert', (req, res) => {
    const payload = req.body;
    // Extract data from payload and check against desired criteria
    if (payload.RecordType === 'Bounce' && payload.Type === 'SpamNotification') {
      // Send message to Slack channel using webhook URL
      const webhookUrl = 'https://hooks.slack.com/services/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';
      const message = { text: `A spam notification has occurred: ${JSON.stringify(payload)}` };
      request.post({ url: webhookUrl, json: message }, (error, response, body) => {
        if (error) {
          console.error(error);
          res.status(500).send('Failed to send message to Slack channel');
        } else {
          res.send('Message sent to Slack channel');
        }
      });
    } else {
      res.status(200).send('Payload does not match desired criteria');
    }
  });
  

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

