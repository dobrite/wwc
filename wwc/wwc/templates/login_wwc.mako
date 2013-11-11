<%inherit file="wwc:templates/base.mako" />

<a href="${request.route_url('index')}">Back to Index</a>
${render_flash_messages()}
<h1>Login</h1>
${form|n}
