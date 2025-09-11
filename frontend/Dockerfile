
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY . .
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
EXPOSE 80