**FoodExpress - Online Food Ordering Platform

Overview**

FoodExpress is a comprehensive online food ordering and delivery platform developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The platform enables users to browse restaurants, order food, make online payments via Stripe, and track their orders efficiently. The project is designed to offer a seamless experience for both customers and restaurant administrators.

**Live Demo**

**Frontend:** [FoodExpress Frontend](https://foodexpress-frontend-wlks.onrender.com/)

**Backend:** [FoodExpress Backend](https://foodexpress-ztha.onrender.com/)

**Features**

🔹 Customer Features

User Authentication: Secure login/signup using JWT authentication.

Browse Food Items: Users can explore a variety of food items categorized for easy access.

Add to Cart & Checkout: Smooth cart management for hassle-free ordering.

Secure Payment: Integrated Stripe payment gateway for secure transactions.

Order History & Tracking: View past orders and track real-time order statuses.

🔹 Admin Panel

Dashboard: A dedicated admin interface for managing restaurant operations.

Food Item Management: Add, update, or remove food items.

Order Management: View and manage incoming food orders.

Revenue Tracking: Monitor total revenue, sales, and customer trends.

Tech Stack



1️⃣** Clone the Repository**

$ git clone https://github.com/your-username/FoodExpress.git
$ cd FoodExpress

2️⃣** Backend Setup**

$ cd backend
$ npm install

Configure Environment Variables

Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
FRONTEND_URL=https://foodexpress-frontend-wlks.onrender.com

Start the backend server:

$ npm start

3️⃣ Frontend Setup

$ cd ../frontend
$ npm install
$ npm run dev


**Contributors

Kshitij (Developer) - GitHub**

License

This project is licensed under the MIT License.
