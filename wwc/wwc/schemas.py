import colander as c
import deform
import deform.widget as w

from hem.db import get_session
from hem.schemas import CSRFSchema


class RedditLoginSchema(CSRFSchema):
    username = c.SchemaNode(c.String(), missing='',
            widget=deform.widget.TextInputWidget(template='readonly/textinput'))
    password = c.SchemaNode(c.String(), validator=c.Length(min=4),
            widget=deform.widget.PasswordWidget())
