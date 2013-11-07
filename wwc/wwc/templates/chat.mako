<%inherit file="wwc:templates/base.mako" />

<%block name="javascript">
  <script type="text/javascript">
    var wwc = {};
    if (Modernizr.websockets){
      wwc.url = "ws://localhost:8000/connection/websocket"
    }else{
      www.url = "http://localhost:8000/connection"
    }
    wwc.namespace = "wwc";
    wwc.token = "${token}";
    wwc.project = "${project_id}";
    wwc.user = "${username}";
    wwc.debug = "${debug}";
    window.wwc = wwc;
  </script>
</%block>

<div id="main" class="container"></div>

<!-- build:js scripts/main.js -->
<script data-main="app/scripts/init" src="app/bower_components/requirejs/require.js"></script>
<!--<script src="app/bower_components/requirejs/require.js"></script>
<script src="app/main.built.js"></script>-->
<!-- endbuild -->
