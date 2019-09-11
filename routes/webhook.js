var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/', function(req, res, next) {
    const form_fields = req.body.form_response.definition.fields;
    const form_answers = req.body.form_response.answers;
    const appbase_record = {};
    form_fields.forEach(function(field, index) {
        const field_to_insert = field.title.replace(/\\/g, '');
        appbase_record[field_to_insert] = form_answers[index].text;
    });
    request.post({
        headers: {
            'content-type': 'application/json; charset=UTF-8',
            authorization: 'Basic ' + btoa(process.env.CREDENTIALS)},
            url: 'https://scalr.api.appbase.io/' + process.env.APP_NAME + '/_doc',
            body: JSON.stringify(appbase_record)
    }, function(error, response){
        res.send(response);
    });
});

module.exports = router;
