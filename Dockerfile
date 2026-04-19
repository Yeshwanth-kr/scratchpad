# Stage 1: Build Stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM nginx:stable-alpine
# Copy the compiled build from the first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]