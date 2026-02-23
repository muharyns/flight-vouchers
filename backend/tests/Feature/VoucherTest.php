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

    public function test_it_returns_exists_false_when_voucher_not_found()
    {
        $response = $this->postJson('/api/check', [
            'flightNumber' => 'GA123',
            'date' => '2026-02-20',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'No vouchers yet for this flight and date.',
                'data' => [
                    'exists' => false,
                    'flight_number' => 'GA123',
                    'flight_date' => '2026-02-20',
                ]
            ]);
    }

    public function test_it_returns_exists_true_when_voucher_exists()
    {
        Voucher::factory()->create([
            'flight_number' => 'GA123',
            'flight_date' => '2026-02-20',
        ]);

        $response = $this->postJson('/api/check', [
            'flightNumber' => 'GA123',
            'date' => '2026-02-20',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Vouchers already exist for this flight and date.',
                'data' => [
                    'exists' => true,
                    'flight_number' => 'GA123',
                    'flight_date' => '2026-02-20',
                ]
            ]);
    }

    public function test_it_validates_date_format()
    {
        $response = $this->postJson('/api/check', [
            'flightNumber' => 'GA123',
            'date' => '20-02-2026',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['date']);
    }

    public function test_response_uses_api_resource_structure()
    {
        $response = $this->postJson('/api/check', [
            'flightNumber' => 'GA123',
            'date' => '2026-02-20',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'exists',
                    'flight_number',
                    'flight_date',
                ],
                'message'
            ]);
    }

    public function test_it_can_generate_voucher_successfully()
    {
        $response = $this->postJson('/api/generate', [
            'name' => 'John Doe',
            'id' => 'CR001',
            'flightNumber' => 'GA123',
            'date' => '2026-02-25',
            'aircraft' => 'ATR',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Voucher generated successfully.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'id',
                    'crew_name',
                    'crew_id',
                    'flight_number',
                    'flight_date',
                    'aircraft_type',
                    'seats',
                    'created_at',
                ]
            ]);

        // Pastikan data tersimpan di database
        $this->assertDatabaseHas('vouchers', [
            'flight_number' => 'GA123',
            'flight_date' => '2026-02-25',
            'crew_name' => 'John Doe',
        ]);

        // Pastikan seats berjumlah 3
        $this->assertCount(3, $response->json('data.seats'));
    }

    public function test_it_prevents_duplicate_voucher_generation()
    {
        Voucher::factory()->create([
            'flight_number' => 'GA123',
            'flight_date' => '2026-02-25',
        ]);

        $response = $this->postJson('/api/generate', [
            'name' => 'John Doe',
            'id' => 'CR001',
            'flightNumber' => 'GA123',
            'date' => '2026-02-25',
            'aircraft' => 'ATR',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Vouchers already generated for this flight and date.'
            ]);
    }

    public function test_it_validates_required_fields()
    {
        $response = $this->postJson('/api/generate', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'name',
                'id',
                'flightNumber',
                'date',
                'aircraft'
            ]);
    }

    public function test_generated_seats_are_returned_in_resource_format()
    {
        $response = $this->postJson('/api/generate', [
            'name' => 'Jane Doe',
            'id' => 'CR002',
            'flightNumber' => 'GA999',
            'date' => '2026-03-01',
            'aircraft' => 'ATR',
        ]);

        $response->assertStatus(200);

        $data = $response->json('data');

        $this->assertArrayHasKey('id', $data);
        $this->assertArrayHasKey('seats', $data);
        $this->assertIsArray($data['seats']);
        $this->assertCount(3, $data['seats']);
    }



    
  
}
