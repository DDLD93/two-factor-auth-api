FROM node:14-alpine
LABEL author="Umar Adamu Jere"
WORKDIR /app
COPY package.json .
RUN ["npm", "install"]
COPY src ./src
CMD ["npm", "start"]
