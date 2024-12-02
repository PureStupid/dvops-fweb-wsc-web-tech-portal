<?php

use App\Models\User;
use Laravel\Dusk\Browser;

test('training session page redirects to login page when not authenticated', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/training-sessions')
            ->waitForLocation('/login')
            ->assertPathIs('/login')
            ->screenshot('training-session-page-not-authenticated');
    });
});

test('training session page is displayed when authenticated', function () {
    $user = User::factory()->create();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/training-sessions')
            ->assertPathIs('/training-sessions')
            ->screenshot('training-session-page-authenticated')
            ->assertSee('Training');
    });
});

test('training session form page redirects to login page when not authenticated', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/training-sessions/create')
            ->waitForLocation('/login')
            ->assertPathIs('/login')
            ->screenshot('training-session-form-page-not-authenticated');
    });
});


test('training session can be created when authenticated', function () {
    $user = User::factory()->create();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/training-sessions/create')
            ->type('title', 'Test Training Session')
            ->type('description', 'This is a test training session.')
            ->type('date', '2022-01-01')
            ->type('time', '09:00')
            ->type('duration', '60')
            ->press('Add')
            ->assertPathIs('/training-sessions');
    });
});

test('training session cannot be created without required fields', function () {
    $user = User::factory()->create();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/training-sessions/create')
            ->press('Add')
            ->assertPathIs('/training-sessions/create')
            ->assertSee('The title field is required.')
            ->assertSee('The description field is required.')
            ->assertSee('The date field is required.')
            ->assertSee('The time field is required.')
            ->assertSee('The duration field is required.');
    });
});

