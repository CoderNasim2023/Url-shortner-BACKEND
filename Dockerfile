FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start the app (for development we use nodemon via docker-compose, for production override as needed)
CMD ["npm", "run", "dev"]
