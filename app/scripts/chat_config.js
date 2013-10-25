define([
],
function () {
    var getCookie = function () {
        return document.cookie.replace(/(?:(?:^|.*;\s*)wwc.token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    };

    var config = {
        namespace: 'wwc',
        url: 'http://localhost:8000/connection',
        token: getCookie(),
        project: '526a5d5ca4dd5f5690bf42c7',
        user: 'Kikkymonk',
        debug: true,
    };

    return config;

});
