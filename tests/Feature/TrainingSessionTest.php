<?php

use App\Models\TrainingSession;
use App\Models\User;

test('training session page redirects to login page when not authenticated', function () {
    $response = $this->get('/training-sessions');

    $response
        ->assertStatus(302)
        ->assertRedirect('/login');

    $this->assertGuest();
});

test('training session page is displayed when authenticated', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/training-sessions');

    $response->assertOk();

    $this->assertAuthenticated();
});

test('add training session form page redirects to login page when not authenticated', function () {
    $response = $this->get('/training-sessions/create');

    $response
        ->assertStatus(302)
        ->assertRedirect('/login');

    $this->assertGuest();
});

test('add training session form page is displayed when authenticated', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/training-sessions/create');

    $response->assertOk();

    $this->assertAuthenticated();
});

test('training session cannot be created when not authenticated', function () {
    $trainingSession = TrainingSession::factory()->make();

    $response = $this->post('/training-sessions', $trainingSession->toArray());

    $response
        ->assertStatus(302)
        ->assertRedirect('/login');

    $this
        ->assertGuest()
        ->assertDatabaseMissing('training_sessions', $trainingSession->toArray());
});

test('training session can be created when authenticated', function () {
    $user = User::factory()->create();
    $trainingSession = TrainingSession::factory()->make();

    $response = $this
        ->actingAs($user)
        ->from('/training-sessions/create')
        ->post('/training-sessions', $trainingSession->toArray());

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/training-sessions');

    $this
        ->assertAuthenticated()
        ->assertDatabaseHas('training_sessions', $trainingSession->toArray());
});

test('training session cannot be created without required fields', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from('/training-sessions/create')
        ->post('/training-sessions', []);

    $response
        ->assertSessionHasErrors(['title', 'description', 'mode', 'venue', 'date', 'start_time', 'end_time', 'duration'])
        ->assertStatus(302);

    $this
        ->assertAuthenticated()
        ->assertDatabaseMissing('training_sessions', []);
});

test('training session cannot be created with validation errors', function () {
    $user = User::factory()->create();
    $trainingSession = TrainingSession::factory()->make([
        'title' => fake()->sentence(256),
        'description' => fake()->sentence(2001),
        'mode' => 'invalid',
        'venue' => fake()->sentence(256),
        'date' => '2022-01-01',
        'start_time' => '05:00',
        'end_time' => '23:00',
        'duration' => 'invalid',]);

    $response = $this
        ->actingAs($user)
        ->from('/training-sessions/create')
        ->post('/training-sessions', $trainingSession->toArray());

    $response
        ->assertSessionHasErrors(['title', 'description', 'mode', 'venue', 'date', 'start_time', 'end_time', 'duration'])
        ->assertStatus(302);

    $this
        ->assertAuthenticated()
        ->assertDatabaseMissing('training_sessions', $trainingSession->toArray());
});
