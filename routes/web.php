<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\CheckArticleOwner;
use App\Http\Controllers\ArticleController;
use Illuminate\Http\Request;


Route::get('/api/articles/{record}', [ArticleController::class, 'getOne'])->name('api.articles.one');
Route::get('/api/articles', [ArticleController::class, 'getAll'])->name('api.articles.all');

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::get('/articles', function () {
  return Inertia::render('Articles');
})->name('articles');
Route::get('/articles/create', function () {
  return Inertia::render('CreateArticlePage');
});
Route::get('/articles/{record}', function () {
  return Inertia::render('ArticlePage');
})->name('article.page');
Route::get('/articles/edit/{record}', function () {
  return Inertia::render('EditArticlePage');
});



Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
  Route::post('/api/articles', [ArticleController::class, 'create'])->name('api.articles.create');
  Route::put('/api/articles/{record}', [ArticleController::class, 'update'])->middleware(CheckArticleOwner::class)->name('api.articles.update');
  Route::delete('/api/articles/{record}', [ArticleController::class, 'destroy'])->middleware(CheckArticleOwner::class)->name('api.articles.destroy');
  // csrf token for post, put and delete requests to work
  Route::get('api/csrf-token', function (Request $request) {
    $token = $request->session()->token();

    $token = csrf_token();

    return $token;
  });
});

require __DIR__ . '/auth.php';
