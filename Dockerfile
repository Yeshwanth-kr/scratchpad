# Stage 1: Build Stage
FROM node:25-alpine AS build
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM nginx:stable-alpine
# Copy the compiled build from the first stage
# Note: Ensure your build output folder is 'dist' or 'build'
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]