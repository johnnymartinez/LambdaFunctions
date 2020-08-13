const util = require('util');
const AWS = require('aws-sdk');
const _ = require('lodash');
const elasticbeanstalk = new AWS.ElasticBeanstalk({
    region: 'us-west-2',
});
async function checkupdate(callback) {
        const response = await elasticbeanstalk.describeConfigurationSettings({
            ApplicationName: /*appname for testing*/ ,
            EnvironmentName: /*envname for testing*/
        }).promise();
        console.log(util.inspect(response, false, null));
        const filtered = _.filter(response.ConfigurationSettings[0].OptionSettings, {
            OptionName: 'ManagedActionsEnabled'
        });
        console.log(filtered)
        const [managed] = filtered;
        if (managed) {
            return managed.Value // true/false