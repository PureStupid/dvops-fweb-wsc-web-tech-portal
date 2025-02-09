<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrainingSessionController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\VerifyAdminRole;
use App\Models\TrainingSession;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
});

Route::get('/dashboard', function () {
    $modes = ['virtual', 'physical'];
    $trainingSessions = TrainingSession::get()->groupBy('mode')->sortBy('date');
    $trainingSessions = collect($modes)->mapWithKeys(function ($mode) use ($trainingSessions) {
        return [$mode => $trainingSessions->get($mode, collect([]))];
    });
    return Inertia::render('Dashboard/Index', compact('trainingSessions'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('training-sessions', TrainingSessionController::class);

    Route::middleware(VerifyAdminRole::class)->resource('users', UserController::class, ['except' => 'index']);
    Route::get('/users', [UserController::class, 'index'])->name('users.index');

});

require __DIR__.'/auth.php';
