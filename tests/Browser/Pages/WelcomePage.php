<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;

class WelcomePage extends Page
{
    /**
     * Get the URL for the page.
     */
    public function url() : string
    {
        return '/';
    }

    /**
     * Assert that the browser is on the page.
     */
    public function assert(Browser $browser) : void
    {
        $browser->assertSeeIn('h1', 'WSC Tech Management Portal');
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array<string, string>
     */
    public function elements() : array
    {
        return [
            '@element' => '#selector',
        ];
    }
}
