###########################################################
#
# Dockerfile for mail-collector-exchange
#
###########################################################

# Setting the base to nodejs 4.4.3
FROM mhart/alpine-node:4.4.3

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

# Startup
CMD ["node", "service.js", "--seneca-log=type:act"]
