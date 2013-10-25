define([
],
function () {
    var getProjectId = function () {
        return document.cookie.replace(/(?:(?:^|.*;\s*)wwc.project_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    };

    var getToken = function () {
        return document.cookie.replace(/(?:(?:^|.*;\s*)wwc.token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    };

    var getUsername = function () {
        return document.cookie.replace(/(?:(?:^|.*;\s*)wwc.username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    };

    var config = {
        namespace: 'wwc',
        url: 'http://localhost:8000/connection',
        token: getToken(),
        project: getProjectId(),
        user: getUsername(),
        debug: true,
    };

    return config;

});
