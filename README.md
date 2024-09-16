## CMS Project

I've developed a robust Content Management System (CMS) that showcases my skills in full-stack development. This project demonstrates my proficiency in modern web technologies and best practices in software architecture.

### 🛠️ Tech Stack
- **Backend:** Laravel
- **Admin Panel:** Filament
- **Frontend:** Inertia.js with React
- **UI Components:** shadcn/ui
- **Build Tool:** Vite
- **Language:** PHP, TypeScript

### 🌟 Key Features
- Seamless integration of Laravel backend with React frontend
- Efficient admin panel powered by Filament
- Modern, responsive UI using shadcn/ui components
- Type-safe frontend development with TypeScript

### 🚀 Getting Started

To clone and run the project locally, follow these steps:

```bash
git clone https://github.com/maciejbaba/cms.git
cd cms
composer install
npm install
npm run build
cp .env.example .env
php artisan migrate
php artisan key:generate
php artisan db:seed --class=UserSeeder
php artisan serve
```

Once set up:
1. Navigate to http://localhost:8000 to use the app
2. Register a test user at the register route (top right corner)
3. For admin access (http://localhost:8000/admin), use an email with the domain 'admin.com'

### 📚 Documentation

Comprehensive documentation is available in the `cms-documentation` folder. To view:

```bash
cd cms-documentation
npm install
npm start
```

Access the documentation at http://localhost:3001

### 🔐 Authentication

- Regular users can register with any email
- Admin access requires an email with the 'admin.com' domain
- Email verification is disabled for demo purposes

### 💡 Why This Matters

This project demonstrates my ability to:
1. Architect complex web applications
2. Integrate multiple technologies seamlessly
3. Implement secure authentication systems
4. Provide comprehensive documentation for ease of use and future development

Feel free to explore the repository and reach out if you have any questions or would like to discuss the project in more detail!
