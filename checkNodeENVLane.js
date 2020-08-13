checkNodeENVLane.js

const AWS = require('aws-sdk');
const elasticbeanstalk = new AWS.ElasticBeanstalk();
const util = require('util');
const _ = require('lodash');

async function evaluateCompliance(configurationItem, ruleparameter, callback) {
    if (!configurationItem.configuration.solutionStackName.match(/.*running Node\.js/)) {
        callback("NOT_APPLICABLE");
        return true;
    }

    envSettings = await getNodeEnv(configurationItem.configuration.applicationName, configurationItem.configuration.environmentName)

    const nodeEnv = envSettings.Value.toLowerCase();
    const tag = configurationItem.configuration.tags['Lane'].toLowerCase();
    if (nodeEnv === tag) {
        return callback('COMPLIANT')
    }

    return callback('NON_COMPLIANT')
}

async function getNodeEnv(appName, envName) {
    const params = {
        ApplicationName: appName,
        EnvironmentName: envName,
    };

    const response = await elasticbeanstalk.describeConfigurationSettings(params).promise();
    //console.log(util.inspect(response, false, null));

    const option = _.find(response.ConfigurationSettings[0].OptionSettings, {
        OptionName: "NODE_ENV"
    });
    console.log(option);
    return option;
}

module.exports = evaluateCompliance;