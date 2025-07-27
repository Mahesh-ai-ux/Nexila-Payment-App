FROM node:18

WORKDIR /app

# Copy only the package files first
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
