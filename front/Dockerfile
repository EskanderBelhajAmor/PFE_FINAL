# Stage 1: Build the Node.js application
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build  

# Stage 2: Use a lightweight Nginx image to serve the built application
FROM nginx:alpine
COPY --from=node /app/dist/frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
# Set the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]