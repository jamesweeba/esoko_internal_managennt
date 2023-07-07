# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the port your API listens on
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production

# Start the API
CMD ["node", "src/app.js"]
