from djangoreactredux.settings.dev import *  # NOQA (ignore all errors on this line)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'tourmonkeys_db',
        'USER': 'tourmonkeys',
        'PASSWORD': 't0urTeam',
        'HOST': 'tourmonkeysdbinstance.cbjveiv1grwa.us-east-2.rds.amazonaws.com',
        'PORT': 5432,
    }
}
