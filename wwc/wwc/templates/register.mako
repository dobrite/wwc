<%inherit file="wwc:templates/base.mako" />

<a href="${request.route_url('index')}">Back to Index</a>
${render_flash_messages()}
<div class="row">
  <div class="col-md-4 col-md-offset-4">
    <h1>Register</h1>
    ${form|n}
  </div>
</div>
