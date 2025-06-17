# ----------- Build Stage -----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package.json and lock file for faster caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Build the React app
RUN npm run build

# ----------- Production Stage -----------
FROM nginx:alpine

# Remove default NGINX static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for web
EXPOSE 80

# Optionally copy custom nginx config (uncomment if you have nginx.conf)
# COPY nginx.conf /etc/nginx/nginx.conf

# Start NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
