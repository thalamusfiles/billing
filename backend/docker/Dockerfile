#############################################
# Este dockerfile deve ser utilizado apenas #
# para o desenvolvimento do projeto         #
#############################################

FROM node:20.7.0-alpine

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

# Copias as pastas do projeto
COPY package.json .
COPY yarn.lock .

# Instala os pacotes para rodar o servidor e os testes
RUN npm install -g ts-node
RUN yarn

