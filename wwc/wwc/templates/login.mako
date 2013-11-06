<%inherit file="wwc:templates/base.mako" />

<a href="${request.route_url('velruse.reddit-login')}">
  <button class="btn btn-default">Login with Reddit</button>
</a>
<a href="${request.route_url('login_guest')}">
  <button class="btn btn-default">Login as a Guest</button>
</a>
