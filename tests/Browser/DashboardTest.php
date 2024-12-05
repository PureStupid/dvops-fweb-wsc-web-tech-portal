<?php

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\DashboardPage;

test('dashboard page is not displayed when not authenticated', function () {
    $page = new DashboardPage();
    $this->browse(function (Browser $browser) use ($page) {
        $browser->visit($page->url())
            ->waitForLocation('/login')
            ->assertPathIs('/login');
    });
});

test('dashboard page is displayed when authenticated', function () {
    $user = User::factory()->create();
    $page = new DashboardPage();

    $this->browse(function (Browser $browser) use ($user, $page) {
        $browser->loginAs($user)
            ->visit($page->url())
            ->screenshot('dashboard-page-authenticated')
            ->assertSeeIn('h2', 'Dashboard');

        $page->assert($browser);
    });
});

test('dashboard page navigate to training session page', function () {
    $user = User::factory()->create();
    $page = new DashboardPage();

    $this->browse(function (Browser $browser) use ($user, $page) {
        $browser->loginAs($user)
            ->visit($page->url())
            ->screenshot('dashboard-page-navigate-to-training-session-page')
            ->clickLink('Training')
            ->waitForLocation('/training-sessions')
            ->assertPathIs('/training-sessions');

    });
});
