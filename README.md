# 🛒 Point of Sale (POS) System
![screencapture-localhost-5173-2025-05-22-11_31_20](https://github.com/user-attachments/assets/78499798-2c33-433f-a0bd-f9dcf96b7d76)

A modern full-stack **POS (Point of Sale)** system designed for small businesses. Built with **React + TypeScript** on the frontend and **Express + MongoDB** on the backend. The app supports product management, customer handling, cart operations, and secure admin login.



## 🚀 Features

### 🔐 Admin Panel
- Admin Register & Login with JWT authentication
- Protected routes for managing resources
- Secure password hashing with bcrypt

### 📦 Product Management
- Add, edit, delete products
- View comprehensive product list
- Image upload with Cloudinary integration
- Product search and filtering

### 👤 Customer Management
- Add and manage customer information
- Select customer before placing orders
- Customer history tracking

### 🛒 Cart & Checkout
- Add/remove/update items in cart
- Change quantities dynamically
- Real-time cart price updates
- Complete checkout functionality
- Order history management

## 🧰 Tech Stack

### 🔧 Backend
- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Zod**
- **JWT** 
- **bcrypt**
- **Cloudinary** 
- **dotenv** 

### 🎨 Frontend
- **React + TypeScript**
- **Redux Toolkit** 
- **Axios** 
- **React Hook Form**
- **Zod** 
- **ShadCN UI** 
- **Tailwind CSS**

## 🛠️ Setup Instructions

### 📦 Prerequisites
- Node.js v18+
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager
- Cloudinary account (for image uploads)

### ⚙️ Backend Setup

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/pos-system.git
cd pos-system
```

2. **Navigate to backend directory:**
```bash
cd backend
npm install
```

3. **Create environment file:**
Create a `.env` file in the `backend/` directory:
```env
MONGO_DB_URL=mongodb://localhost:27017/pos-system
PORT=4000
JWT_SECRET=your-super-secret-jwt-key-here

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

4. **Run development server:**
```bash
npm run dev
```

The backend will run on: `http://localhost:4000`

### 💻 Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
npm install
```

2. **Create environment file:**
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:4000
```

3. **Run the frontend:**
```bash
npm run dev
```

The frontend will run on: `http://localhost:5173`

## 🎯 Usage

1. **Admin Registration:** Create an admin account through the registration page
2. **Login:** Use your credentials to access the admin panel
3. **Add Products:** Navigate to product management to add your inventory
4. **Add Customers:** Register customers in the system
5. **Process Sales:** Use the POS interface to create orders and process payments
6. **View Reports:** Check sales history and generate reports

## ✅ To Do / Future Features

- [ ] Sales reporting dashboard
- [ ] Print invoice/receipt functionality
- [ ] Role-based access control (Admin/Cashier)
- [ ] Product categories and advanced filtering
- [ ] Inventory management with low stock alerts
- [ ] Multi-payment method support
- [ ] Customer loyalty program
- [ ] Barcode scanning integration
- [ ] Export sales data to CSV/PDF
- [ ] Real-time notifications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dulitha Pathum**
- GitHub: ([https://github.com/dulithapathum](https://github.com/Dulithapathum))
- Portfolio: ([https://my-portfolio-yb1h.vercel.app/](https://my-portfolio-yb1h.vercel.app/))
- LinkedIn: ([https://www.linkedin.com/in/dulitha-pathum/](https://www.linkedin.com/in/dulitha-pathum/))

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Inspired by modern POS systems used in retail businesses
- Built with love for the small business community

## 📞 Support

If you have any questions or need help setting up the project, please:
- Open an issue on GitHub
- Contact me through my portfolio website
- Join our community discussions

---

⭐ **Star this repository if you found it helpful!**
