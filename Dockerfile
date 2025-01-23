FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d

COPY nginx.conf /etc/nginx/conf.d

COPY dist/apps/kms-desktop/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]