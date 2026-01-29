# Use Node.js 22 Alpine as base image (Compatible with Next.js 14+)
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port (Next.js default)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
