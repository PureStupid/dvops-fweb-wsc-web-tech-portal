<?php

use Laravel\Dusk\Browser;

test('home page', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/')
            ->assertSeeIn('h1', 'WSC Tech Management Portal')
            ->assertSeeIn('button', 'Login');
    });
});
