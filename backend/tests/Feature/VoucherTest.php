<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Voucher;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VoucherTest extends TestCase
{
    use RefreshDatabase;

    private function validData()
    {
        return [
            'crew_name'     => 'John Doe',
            'crew_id'       => 'C001',
            'flight_number' => 'GA123',
            'flight_date'   => '2026-02-20',
            'aircraft_type' => 'Boeing 737',
            'seat1'         => '12A',
            'seat2'         => '12B',
            'seat3'         => '12C',
        ];
    }

    
    public function test_it_can_create_voucher()
    {
        $response = $this->postJson('/api/vouchers', $this->validData());

        $response->assertStatus(201)
            ->assertJsonPath('data.flight_number', 'GA123')
            ->assertJsonPath('data.flight_date', '2026-02-20');


        $this->assertDatabaseHas('vouchers', [
            'flight_number' => 'GA123',
            'flight_date'   => '2026-02-20',
        ]);
    }

    
    public function test_it_cannot_create_duplicate_voucher()
    {
        Voucher::factory()->create([
            'flight_number' => 'GA123',
            'flight_date'   => '2026-02-20',
        ]);

        $response = $this->postJson('/api/vouchers', $this->validData());

        $response->assertStatus(405);
    }


    
 
  
    
    public function test_database_prevents_duplicate_even_without_validation()
    {
        Voucher::factory()->create([
            'flight_number' => 'GA123',
            'flight_date'   => '2026-02-20',
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);

        Voucher::create($this->validData());
    }

    
  
}
