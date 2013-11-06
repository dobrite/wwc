define([
    'handlebars',
    'moment',
],
function (Handlebars, moment) {

    function timestamp (ts, options) {
        return moment.unix(ts).format("HH:mm:ss");
    }

    Handlebars.registerHelper('timestamp', timestamp);

    return timestamp;

});
