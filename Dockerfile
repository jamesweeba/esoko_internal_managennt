# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --production

# Copy the application source code to the working directory
COPY . .

# Expose the port your application listens on
EXPOSE 5000

# Set the environment variable for production
ENV NODE_ENV=production

# Run the application
CMD ["node", "src/app.js"]
