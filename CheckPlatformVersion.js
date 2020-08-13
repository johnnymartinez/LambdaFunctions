const aws = require('aws-sdk')
aws.config.update({
    region: 'us-west-2'
})
const getElasticbeanstalkInstances = require('./rules/enableManagedUpdates')
const test = require('./Test_Message')

getElasticbeanstalkInstances()
    .then((response) => {
        console.log('response:', response);
    });