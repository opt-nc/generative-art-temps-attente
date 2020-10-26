FROM nginx:alpine
RUN mkdir /usr/share/nginx/orbit
COPY ./orbit/ /usr/share/nginx/orbit/
COPY ./etc/nginx.conf /etc/nginx/nginx.conf
