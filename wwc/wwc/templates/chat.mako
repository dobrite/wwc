<%inherit file="wwc:templates/base.mako" />

<%block name="js">
  <script type="text/javascript">
  </script>

</%block>

<div id="main" class="container"></div>

<!-- build:js scripts/main.js -->
<script data-main="app/scripts/init" src="app/bower_components/requirejs/require.js"></script>
<!--<script src="app/bower_components/requirejs/require.js"></script>
<script src="app/main.built.js"></script>-->
<!-- endbuild -->
