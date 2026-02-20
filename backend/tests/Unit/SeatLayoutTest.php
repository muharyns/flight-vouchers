<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\SeatLayoutService;

class SeatLayoutTest extends TestCase
{
    private SeatLayoutService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new SeatLayoutService();
    }

    /** @test */
    public function atr_layout_is_correct()
    {
        $seats = $this->service->generateSeats('ATR');

        $this->assertContains('1A', $seats);
        $this->assertContains('18F', $seats);
        $this->assertNotContains('19A', $seats);
        $this->assertNotContains('1B', $seats);
    }

    /** @test */
    public function airbus_layout_is_correct()
    {
        $seats = $this->service->generateSeats('Airbus 320');

        $this->assertContains('1A', $seats);
        $this->assertContains('32F', $seats);
        $this->assertNotContains('33A', $seats);
    }

    /** @test */
    public function boeing_layout_is_correct()
    {
        $seats = $this->service->generateSeats('Boeing 737 Max');

        $this->assertContains('1A', $seats);
        $this->assertContains('32F', $seats);
        $this->assertNotContains('33A', $seats);
    }
}
