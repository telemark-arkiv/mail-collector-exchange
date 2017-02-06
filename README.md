[![Build Status](https://travis-ci.org/telemark/mail-collector-exchange.svg?branch=master)](https://travis-ci.org/telemark/mail-collector-exchange)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# mail-collector-exchange

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/mail-collector-exchange.svg)](https://greenkeeper.io/)
Collect a user's unread mails from exchange

## Inbound messages
This microservice listens for the following messages


- ```{cmd: 'collect-tasks', type: 'user'}```

## Outbound messages
This microservice emits the following messages

- ```{info: 'tasks', type:'user'}```

## Docker
Build the image

```
$ docker build -t mail-collector-exchange .
```

Start

```
$ docker run -d --net host --name mail-collector-exchange mail-collector-exchange
```

From hub.docker.com

```
$ docker run -d --net host --name mail-collector-exchange telemark/mail-collector-exchange
```

Call the service

```
$ curl -d '{"cmd":"collect-tasks", "type": "user", "user":"enge"}' -v http://192.168.99.100:8000/act
```