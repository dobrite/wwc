<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Login</title>
    <link rel="stylesheet"
          href="${request.static_url('deform:static/css/form.css')}"
          type="text/css"/>
    <link rel="stylesheet"
          href="${request.static_url('deform:static/css/bootstrap.min.css')}"
          type="text/css" media="screen" charset="utf-8"/>
    % for css in reqts['css']:
    <link rel="stylesheet" href="${request.static_url(css)}" type="text/css" />
    % endfor

    <script src="${request.static_url('deform:static/scripts/jquery-2.0.3.min.js')}"
            type="text/javascript"></script>
    <script src="${request.static_url('deform:static/scripts/bootstrap.min.js')}"
            type="text/javascript"></script>
    % for js in reqts['js']:
    <script type="text/javascript" src="${request.static_url(js)}"></script>
    % endfor
  </head>
  <body>
    ${form|n}
    <script type="text/javascript">
        deform.load()
    </script>
  </body>
</html>
