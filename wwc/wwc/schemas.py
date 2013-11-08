import colander as c
import deform
import deform.widget as w

from hem.db import get_session
from hem.schemas import CSRFSchema

from horus.models import _
from horus.schemas import unique_email
from horus.schemas import unique_username


class WWCRegisterSchema(CSRFSchema):
    username = c.SchemaNode(c.String(), title=_('User name'),
        description=_("Name with which you will log in"),
        validator=unique_username)
    email = c.SchemaNode(c.String(), title=_('Email'),
        validator=c.All(c.Email(), unique_email),
        description=_("Example: joe@example.com"),
        widget=w.TextInputWidget(size=40, maxlength=260, type='email'),
        missing=None)
    password = c.SchemaNode(c.String(), validator=c.Length(min=4),
        widget=deform.widget.CheckedPasswordWidget(),
        description=_("Your password must be harder than a "
            "dictionary word or proper name!"))
