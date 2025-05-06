# Product Inventory

A web application for managing a product inventory system, built with React and Django. This application allows users to view, add, edit, and delete products, as well as track inventory details.

## Features

- **Product Management**: Add, edit, and delete products.
- **Inventory Tracking**: Track the stock quantity of each product.
- **Responsive Design**: Mobile-friendly and works across all devices.
- **User Authentication**: (Optional) Secure user login and registration (if implemented).
- **RESTful API**: Backed by a Django REST API for managing products and inventory.

## Technologies Used

### Frontend
- **React.js**: For building the user interface.
- **Axios**: For making HTTP requests to the backend API.
- **React Router**: For handling navigation.
- **Bootstrap**: For responsive UI components.

### Backend
- **Django**: Web framework for backend development.
- **Django REST Framework**: To build the RESTful API.
- **SQLite**: Lightweight database for storing product and inventory data.

## Installation

### Prerequisites

- Node.js (Frontend)
- Python 3.x (Backend)
- Django and Django REST Framework (Backend)
- SQLite (or any other database)

### Steps to Run the Project Locally

#### 1. Clone the repository

```bash
git clone https://github.com/hemanthskreddy/product-inventory.git
cd product-inventory
2. Set up the Backend (Django)
Navigate to the backend directory:

bash
cd backend
Create and activate a virtual environment (optional but recommended):

bash
python -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
Install the required dependencies:

bash
pip install -r requirements.txt
Apply database migrations:

bash
python manage.py migrate
Start the backend server:

bash
python manage.py runserver
The backend API should now be running on http://127.0.0.1:8000/.

3. Set up the Frontend (React)
Navigate to the frontend directory:

bash
cd frontend
Install the required dependencies:

bash
npm install
Start the React development server:

bash
npm start
The frontend should now be running on http://localhost:3000/.

4. Connect the Frontend with the Backend
Make sure the frontend is configured to point to the backend API for fetching data. This can typically be done in the src/api.js or similar file where the base URL is set for your API calls.

5. Access the Application
Open your browser and go to http://localhost:3000/ to view the frontend.

You can interact with the application and manage your product inventory.
