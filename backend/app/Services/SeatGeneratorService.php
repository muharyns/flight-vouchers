<?php

namespace App\Services;

use Exception;

class SeatGeneratorService
{
    protected array $layouts = [
        'ATR' => ['rows' => 18, 'seats' => ['A', 'C', 'D', 'F']],
        'Airbus 320' => ['rows' => 32, 'seats' => ['A', 'B', 'C', 'D', 'E', 'F']],
        'Boeing 737 Max' => ['rows' => 32, 'seats' => ['A', 'B', 'C', 'D', 'E', 'F']],
    ];

    public function generate(string $aircraft, int $count = 3): array
    {
        if (!isset($this->layouts[$aircraft])) {
            throw new Exception("Invalid aircraft type: $aircraft");
        }

        $layout = $this->layouts[$aircraft];
        $rows = range(1, $layout['rows']);
        $seats = $layout['seats'];

        $allSeats = [];
        foreach ($rows as $row) {
            foreach ($seats as $seat) {
                $allSeats[] = $row . $seat;
            }
        }

        if ($count > count($allSeats)) {
            throw new Exception("Not enough seats to generate $count unique seats");
        }

        shuffle($allSeats);
        return array_slice($allSeats, 0, $count);
    }
}
