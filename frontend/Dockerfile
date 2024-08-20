# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY src ./src

COPY public ./public

# Build the frontend (if applicable)
RUN yarn build

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]