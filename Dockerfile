FROM node:20
WORKDIR /app
COPY package*.json ./
# ENV NODE_ENV=production
ENV HUSKY_SKIP_INSTALL=true
ENV HUSKY=0
RUN npm install --omit=dev
COPY ./dist ./dist
EXPOSE 5000
CMD [ "npm", "start" ]
