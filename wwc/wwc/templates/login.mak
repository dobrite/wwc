<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Login</title>
  </head>
  <body>
    <form id="reddit" action="${login_url(request, 'reddit')}" method="post">
      <input type="submit" value="Login with Reddit" />
    </form>
  </body>
</html>
