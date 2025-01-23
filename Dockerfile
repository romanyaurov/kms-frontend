FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY dist/apps/kms-desktop/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]