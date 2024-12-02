<?php

use App\Models\User;
use Laravel\Dusk\Browser;

test('dashboard page is not displayed when not authenticated', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/dashboard')
            ->waitForLocation('/login')
            ->assertPathIs('/login');
    });
});

test('dashboard page is displayed when authenticated as student', function () {
    $student = User::create([
        'name' => 'James Lee',
        'email' => '2301234A@student.tp.edu.sg',
        'gender' => 'male',
        'phone_number' => 91234567,
        'role' => 'student',
        'password' => 'test',
    ]);
    $this->browse(function (Browser $browser) use ($student) {
        $browser->loginAs($student)
            ->visit('/dashboard')
            ->screenshot('dashboard-page-authenticated-student')
            ->assertSee('Dashboard');
    });
});

test('dashboard page is displayed when authenticated as lecturer', function () {
    $lecturer = User::create([
        'name' => 'Ana Yap',
        'email' => 'ana_yap@tp.edu.sg',
        'gender' => 'female',
        'phone_number' => 81234567,
        'role' => 'lecturer',
        'password' => 'test',
    ]);
    $this->browse(function (Browser $browser) use ($lecturer) {
        $browser->loginAs($lecturer)
            ->visit('/dashboard')
            ->screenshot('dashboard-page-authenticated-lecturer')
            ->assertSee('Dashboard');
    });
});

