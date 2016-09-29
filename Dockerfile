###########################################################
#
# Dockerfile for mail-collector-exchange
#
###########################################################

# Setting the base to nodejs 4.6.0
FROM mhart/alpine-node:4.6.0

# Maintainer
MAINTAINER Jonas Enge

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV MAIL_COLLECTOR_EXCHANGE_TAG mail-collector-exchange
ENV MAIL_COLLECTOR_EXCHANGE_URL http://exchange.no
ENV MAIL_COLLECTOR_EXCHANGE_HOST localhost
ENV MAIL_COLLECTOR_EXCHANGE_PORT 8000
ENV EWS_MAIL_URL https://epost.vfk.no/ews/Exchange.asmx
ENV EWS_MAIL_USERNAME domain\\username
ENV EWS_MAIL_PASSWORD password
ENV EWS_MAIL_DOMAIN @skole.t-fk.no
ENV EWS_MAIL_OWA_URL https://epost.vfk.no/owa/#path=/inbox
ENV EWS_MAIL_LIMIT 20

# Startup
CMD ["node", "service.js", "--seneca-log=type:act"]
