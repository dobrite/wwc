<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title></title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <link rel="stylesheet" href="/app/bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="/app/css/wwc.css">

    <!-- build:js scripts/vendor/modernizr.js -->
    <script src="/app/bower_components/modernizr/modernizr.js"></script>
    <!-- endbuild -->

    <%block name="javascript" />

  </head>

  <body>
    <nav class="navbar navbar-inverse" role="navigation">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">WWC</a>
      </div>
        <a href="${request.route_url('login_choice')}">
          <button type="button" class="btn btn-default navbar-btn navbar-right">Login</button>
        </a>
    </nav>

    ${self.body()}

    <div class="footer">
      <%block name="footer"/>
    </div>
  </body>
</html>
