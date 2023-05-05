# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any dependencies that are defined in package.json
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000, which is the default port for React apps
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
