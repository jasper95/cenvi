#!/bin/sh
set -eu

envsubst '${PORT} ${API_PORT} ${GEOSERVER_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"