# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
COPY app.js ./

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
