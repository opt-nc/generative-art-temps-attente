FROM nginx:alpine
COPY ./orbit/ /usr/share/nginx/html
COPY ./jumpers/ /usr/share/nginx/html
COPY ./gravity/ /usr/share/nginx/html
