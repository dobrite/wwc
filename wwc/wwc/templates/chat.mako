<%inherit file="wwc:templates/base.mako" />

<%block name="javascript">
<script src="app/loader/dist/widget.load.v1.default.js?parameter=123&user=emilisto&base_url=http://localhost:6543/app" async></script>
  <!--<script type="text/javascript">
    //var wwc = {};
    //if (Modernizr.websockets){
    //  wwc.url = "ws://localhost:8000/connection/websocket"
    //}else{
    //  www.url = "http://localhost:8000/connection"
    //}
    //wwc.namespace = "wwc";
    //wwc.token = "${token}";
    //wwc.project = "${project_id}";
    //wwc.user = "${username}";
    //wwc.debug = ${'true' if debug else 'false'}
    //window.wwc = wwc;
  </script>-->
</%block>

<div id="main"></div>

<!-- build:js scripts/main.js -->
<!--<script data-main="app/scripts/init" src="app/bower_components/requirejs/require.js"></script>-->
<!--<script src="app/bower_components/requirejs/require.js"></script>
<script src="app/main.built.js"></script>-->
<!-- endbuild -->
