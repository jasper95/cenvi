#!/bin/sh
set -eu

envsubst '${PORT} ${API_PORT} ${GEOSERVER_PORT} ${SERVER_NAME} ${GEOSERVER_API}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"