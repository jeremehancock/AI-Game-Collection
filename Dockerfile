# Step 1: Use an official Nginx image as the base
FROM nginx:alpine

# Step 2: Set the working directory in the Nginx container
WORKDIR /usr/share/nginx/html/

# Step 3: Copy all files and directories from the 'games' directory to the Nginx root
COPY . /usr/share/nginx/html/

# Step 4: Expose port 80 for the container
EXPOSE 80

# Step 6: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

