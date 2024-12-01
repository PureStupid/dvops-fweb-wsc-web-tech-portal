<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrainingSessionController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\VerifyAdminRole;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/training-sessions', [TrainingSessionController::class, 'index'])->name('training-sessions.index');
    Route::get('/training-sessions/create', [TrainingSessionController::class, 'create'])->name('training-sessions.create');
    Route::post('/training-sessions', [TrainingSessionController::class, 'store'])->name('training-sessions.store');

    Route::middleware(VerifyAdminRole::class)->resource('users', UserController::class, ['except' => 'index']);
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
});

require __DIR__.'/auth.php';
