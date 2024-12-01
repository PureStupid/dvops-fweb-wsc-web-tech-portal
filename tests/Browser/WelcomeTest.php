<?php

use Laravel\Dusk\Browser;

test('welcome page', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/')
            ->screenshot('welcome-page')
            ->assertSeeIn('h1', 'WSC Tech Management Portal');
    });
});
