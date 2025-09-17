FROM node:latest
# this imports the image node

WORKDIR /app
#this is the to specify our working directory

COPY package*.json ./
# this is to copy the package.json and package-lock.json first into workdir

RUN npm ci
# insalls all the dependancies

COPY . .
#copying all the file contents

EXPOSE 5000
# exposes the port im using

CMD ["npm", "start"]
# this is the command to run the server