<?php

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\WelcomePage;

test('welcome page is displayed when not authenticated', function () {
    $page = new WelcomePage();
    $this->browse(function (Browser $browser) use ($page) {
        $browser->visit($page->url())
            ->screenshot('welcome-page-not-authenticated')
            ->assertSeeIn('h1', 'WSC Tech Management Portal');
        $page->assert($browser);
    });
});

test('welcome page is displayed when authenticated', function () {
    $user = User::factory()->create();
    $page = new WelcomePage();

    $this->browse(function (Browser $browser) use ($user, $page) {
        $browser->loginAs($user)
            ->visit($page->url())
            ->screenshot('welcome-page-authenticated')
            ->assertSeeIn('h1', 'WSC Tech Management Portal');
        $page->assert($browser);
    });
});
