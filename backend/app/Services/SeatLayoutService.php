<?php

namespace App\Services;

class SeatLayoutService
{
    private $layouts = [
        'ATR' => [
            'rows' => [1, 18],
            'seats' => ['A', 'C', 'D', 'F'],
        ],
        'Airbus 320' => [
            'rows' => [1, 32],
            'seats' => ['A', 'B', 'C', 'D', 'E', 'F'],
        ],
        'Boeing 737 Max' => [
            'rows' => [1, 32],
            'seats' => ['A', 'B', 'C', 'D', 'E', 'F'],
        ],
    ];

    public function generateSeats(string $aircraftType): array
    {
        if (!isset($this->layouts[$aircraftType])) {
            throw new \Exception("Invalid aircraft type");
        }

        $layout = $this->layouts[$aircraftType];

        [$start, $end] = $layout['rows'];
        $letters = $layout['seats'];

        $seats = [];

        for ($row = $start; $row <= $end; $row++) {
            foreach ($letters as $letter) {
                $seats[] = $row . $letter;
            }
        }

        return $seats;
    }
}
