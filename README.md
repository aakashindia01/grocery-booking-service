# Grocery Booking Service

This is a Node.js application for managing grocery bookings.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/aakashindia01/grocery-booking-service.git
    ```

2. Navigate to the project directory:

    ```bash
    cd grocery-booking-service
    ```

3. Set up environment variables by creating a .env file in the project root directory and add the following content:

    ```plaintext
    MYSQL_DATABASE=grocery_booking
    MYSQL_HOST=mysql
    MYSQL_ROOT_USER=root
    MYSQL_ROOT_PASSWORD=admin
    MYSQL_USER=user
    MYSQL_PASSWORD=123456
    ```

4. Start the application using Docker Compose:

    ```bash
    docker-compose up -d
    ```

## Usage

Once the application is up and running, you can access it at: http://localhost:3100/api/user/users

## Technologies Used

- Node.js
- Experes.js
- Typescript 
- MySQL
- Docker

