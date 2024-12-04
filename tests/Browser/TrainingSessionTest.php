<?php

use App\Models\TrainingSession;
use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\AddTrainingSessionPage;
use Tests\Browser\Pages\TrainingSessionPage;

test('training session page redirects to login page when not authenticated', function () {
    $page = new TrainingSessionPage();
    $this->browse(function (Browser $browser) use ($page) {
        $browser->visit($page->url())
            ->waitForLocation('/login')
            ->assertPathIs('/login')
            ->screenshot('training-session-page-not-authenticated');
    });
});

test('training session page is displayed when authenticated', function () {
    $user = User::factory()->create();
    $page = new TrainingSessionPage();

    $this->browse(function (Browser $browser) use ($user, $page) {
        $browser->loginAs($user)
            ->visit($page->url())
            ->screenshot('training-session-page-authenticated')
            ->assertSeeIn('h2', 'Training');

        $page->assert($browser);
    });
});

test('training session form page redirects to login page when not authenticated', function () {
    $page = new AddTrainingSessionPage();
    $this->browse(function (Browser $browser) use ($page) {
        $browser->visit($page->url())
            ->waitForLocation('/login')
            ->assertPathIs('/login')
            ->screenshot('training-session-form-page-not-authenticated');
    });
});

test('training session form page is displayed when authenticated', function () {
    $user = User::factory()->create();
    $trainingSessionPage = new TrainingSessionPage();
    $addTrainingSessionPage = new AddTrainingSessionPage();

    $this->browse(function (Browser $browser) use ($user, $trainingSessionPage, $addTrainingSessionPage) {
        $browser->loginAs($user)
            ->visit($trainingSessionPage->url())
            ->press('button#addTrainingSession')
            ->waitForLocation($addTrainingSessionPage->url())
            ->assertPathIs($addTrainingSessionPage->url())
            ->assertSeeIn('h2', 'Add Training Session')
            ->screenshot('training-session-form-page-authenticated');
    });
});

test('training session can be created when authenticated', function () {
    $user = User::factory()->create();
    $page = new AddTrainingSessionPage();

    $this->browse(function (Browser $browser) use ($user, $page) {
        $date = now()->format('mdY');
        $browser->loginAs($user)
            ->visit($page->url())
            ->type('input#title', 'Test Training Session')
            ->type('textarea#description', 'This is a test training session')
            ->click('input#virtualRadioButton')
            ->type('input#venue', 'Microsoft Teams')
            ->type('input#date', $date)
            ->type('input#startTime', '1000AM')
            ->type('input#endTime', '1200PM')
            ->press('button#submit')
            ->waitForLocation('/training-sessions')
            ->assertPathIs('/training-sessions')
            ->assertSee('Training session created successfully.')
            ->screenshot('training-session-created');
    });
});

test('training session cannot be created without required fields', function () {
    $user = User::factory()->create();
    $page = new AddTrainingSessionPage();

    $this->browse(function (Browser $browser) use ($user, $page) {
        $browser->loginAs($user)
            ->visit($page->url())
            ->press('button#submit')
            ->screenshot('training-session-form-required-fields');

        $page->assert($browser);
    });
});

test('training session cannot be created with validation errors', function () {
    $user = User::factory()->create();
    $page = new AddTrainingSessionPage();

    $this->browse(function (Browser $browser) use ($user, $page) {
        $browser->loginAs($user)
            ->visit($page->url())
            ->type('input#title', fake()->sentence(256))
            ->type('textarea#description', fake()->sentence(2001))
            ->click('input#virtualRadioButton')
            ->type('input#venue', fake()->sentence(2001))
            ->type('input#date', '01012021')
            ->type('input#startTime', '1000AM')
            ->type('input#endTime', '0900AM')
            ->press('button#submit')
            ->screenshot('training-session-form-validation-errors');

        $page->assert($browser);
    });
});

