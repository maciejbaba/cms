## CMS

Backend built with Laravel
Frontend for admin panel is built with Filament
Frontend for the app is built with Inertia and React

### To clone and run repo use commands below

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

Go to http://localhost:8000 in order to use the app

Go to register route in the top right corner

Register as a test user for example:
Name: test
Email: test@test.test
Password: testtest
Confirm Password: testtest

Then login in with above credentials

If you want to have access to http://localhost:8000/admin
You need to use test@admin.com as an email
The auth systems checks if the domain is admin.com, additional check if email is verified is disabled for this demo purposes

### Documentation

Documentation is in the folder cms-documentation
To run the documentation, use the command below

```bash
cd cms-documentation
npm install
npm start
```

Go to http://localhost:3001
