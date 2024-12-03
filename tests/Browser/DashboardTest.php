<?php

use App\Models\User;
use Laravel\Dusk\Browser;

test('dashboard page is not displayed when not authenticated', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/dashboard')
            ->waitForLocation('/login')
            ->screenshot('dashboard-page-not-authenticated')
            ->assertPathIs('/login');
    });
});

test('dashboard page is displayed when authenticated', function () {
    $user = User::factory()->create();
    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/dashboard')
            ->assertPathIs('/dashboard')
            ->screenshot('dashboard-page-authenticated')
            ->assertSee('Dashboard');
    });
});
