<%inherit file="wwc:templates/base.mako" />

<%block name="javascript">
  <script type="text/javascript">
    var wwc = {};
    if (Modernizr.websockets){
      wwc.url = "ws://" + location.hostname + "/connection/websocket"
    }else{
      www.url = "http://" + location.hostname + "/connection"
    }
    wwc.namespace = "wwc";
    wwc.token = "${token}";
    wwc.project = "${project_id}";
    wwc.user = "${username}";
    wwc.debug = ${'true' if debug else 'false'}
    window.wwc = wwc;
  </script>
</%block>

<div id="main"></div>

<!-- build:js scripts/main.js -->
<script data-main="app/scripts/init" src="app/bower_components/requirejs/require.js"></script>
<!--<script src="app/bower_components/requirejs/require.js"></script>
<script src="app/main.built.js"></script>-->
<!-- endbuild -->
