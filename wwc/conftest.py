def pytest_sessionstart():
    import os
    from py.test import config

    # Only run database setup on master (in case of xdist/multiproc mode)
    if not hasattr(config, 'slaveinput'):
        from sqlalchemy import engine_from_config
        from paste.deploy.loadwsgi import appconfig

        from wwc.models import Base

        import pkg_resources
        pkgroot = pkg_resources.get_distribution('wwc').location
        test_ini_path = os.path.join(pkgroot, 'test.ini')
        settings = appconfig('config:{}'.format(test_ini_path))
        engine = engine_from_config(settings, prefix='sqlalchemy.')

        print('Creating the tables on the test database {}'.format(engine))

        Base.metadata.drop_all(engine)
        Base.metadata.create_all(engine)
