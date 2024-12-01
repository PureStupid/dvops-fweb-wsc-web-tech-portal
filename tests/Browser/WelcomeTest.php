<?php

use Laravel\Dusk\Browser;

test('home page', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/')
            ->screenshot('home-page')
            ->assertSeeIn('h1', 'WSC Tech Management Portal');
    });
});
