---
sidebar_position: 1
---

# Installation Guide

This Content Management System (CMS) is built using Laravel for the backend, Filament for the admin panel frontend, and Inertia with React for the application frontend. Follow the steps below to clone the repository, set up the development environment, and run the application.

## Prerequisites

Before you begin, ensure you have the following software installed:

-   [PHP](https://www.php.net/) (version 8.0 or higher)
-   [Composer](https://getcomposer.org/)
-   [Node.js](https://nodejs.org/) (version 14 or higher)
-   [npm](https://www.npmjs.com/)
-   [Git](https://git-scm.com/)

## Cloning and Running the Repository

To clone the repository and set up the project, use the following commands:

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

## Documentation

The documentation for this project is located in the cms-documentation folder. To run the documentation site locally, follow these steps:

```bash
cd cms-documentation
npm install
npm start
```

You can then access the documentation at http://localhost:3001.
