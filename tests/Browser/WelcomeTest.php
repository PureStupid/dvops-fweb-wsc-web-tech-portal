<?php

use App\Models\User;
use Laravel\Dusk\Browser;

test('welcome page is displayed when not authenticated', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/')
            ->screenshot('welcome-page')
            ->assertSeeIn('h1', 'WSC Tech Management Portal');
    });
});

test('welcome page is displayed when authenticated', function () {
    $user = User::factory()->create();
    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/')
            ->screenshot('welcome-page-authenticated')
            ->assertSeeIn('h1', 'WSC Tech Management Portal');
    });
});
