<?php

use App\Models\User;
use Laravel\Dusk\Browser;

test('training session page is not displayed when not authenticated', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/training-sessions')
            ->waitForLocation('/login')
            ->assertPathIs('/login');
    });
});

test('training session page is displayed when authenticated as student', function () {
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
            ->visit('/training-sessions')
            ->assertPathIs('/training-sessions')
            ->screenshot('training-session-page-authenticated-student')
            ->assertSee('Training');
    });
});

test('training session page is displayed when authenticated as lecturer', function () {
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
            ->visit('/training-sessions')
            ->assertPathIs('/training-sessions')
            ->screenshot('training-session-page-authenticated-lecturer')
            ->assertSee('Training');
    });
});
