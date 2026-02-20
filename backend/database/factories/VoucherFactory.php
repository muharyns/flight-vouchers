<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VoucherFactory extends Factory
{
    public function definition(): array
    {
        return [
            'crew_name'     => $this->faker->name,
            'crew_id'       => $this->faker->uuid,
            'flight_number' => 'GA' . rand(100, 999),
            'flight_date'   => now()->format('Y-m-d'),
            'aircraft_type' => 'Boeing 737',
            'seat1'         => '12A',
            'seat2'         => '12B',
            'seat3'         => '12C',
        ];
    }
}
