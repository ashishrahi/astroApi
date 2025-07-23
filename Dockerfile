# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies (ignoring peer conflicts)
RUN npm install --legacy-peer-deps

# Copy all remaining files (source code + .env if needed)
COPY . .

# Optional: If you want to COPY .env inside container (not recommended for prod)
# COPY .env .env

# Expose your app port
EXPOSE 5000

# Default command
CMD ["node", "server.js"]
