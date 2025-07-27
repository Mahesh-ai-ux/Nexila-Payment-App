FROM node:18

# Set working directory
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install backend dependencies (includes express, mongoose, etc.)
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose port (matches docker-compose.yml)
EXPOSE 5000

# Start the backend app
CMD ["node", "server.js"]
