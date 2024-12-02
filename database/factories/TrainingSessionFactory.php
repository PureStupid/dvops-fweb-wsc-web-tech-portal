<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainingSession>
 */
class TrainingSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition() : array
    {
        $startTime = fake()->dateTimeBetween('today 09:00', 'today 17:45')->format('H:i');
        $endTime = fake()->dateTimeBetween($startTime, 'today 17:45')->format('H:i');

        $startDateTime = \DateTime::createFromFormat('H:i', $startTime);
        $endDateTime = \DateTime::createFromFormat('H:i', $endTime)->modify('+15 minutes');

        // Ensure start and end time are of 15 minute intervals
        $startTime = $startDateTime
            ->setTime($startDateTime->format('H'), ceil($startDateTime->format('i') / 15) * 15)
            ->format('H:i');
        $endTime = $endDateTime
            ->setTime($endDateTime->format('H'), ceil($endDateTime->format('i') / 15) * 15)
            ->format('H:i');


        // Calculate the duration in hours and minutes
        $duration = $endDateTime->diff($startDateTime)->format('%H:%I');

        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'mode' => fake()->randomElement(['virtual', 'physical']),
            'venue' => fake()->address(),
            'date' => fake()->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'duration' => $duration,
        ];
    }
}
