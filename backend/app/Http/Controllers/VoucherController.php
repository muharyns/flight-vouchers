<?php

namespace App\Http\Controllers;

use App\Http\Resources\VoucherResource;
use App\Http\Resources\VoucherCheckResource;
use App\Http\Requests\VoucherRequest;
use App\Models\Voucher;
use App\Services\SeatGeneratorService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VoucherController extends Controller
{
    protected SeatGeneratorService $seatService;

    public function __construct(SeatGeneratorService $seatService)
    {
        $this->seatService = $seatService;
    }

    public function index()
    {
 
       return Voucher::latest()->paginate(5);
    }

    // POST /api/check
    public function check(Request $request)
    {
        $request->validate([
            'flightNumber' => 'required|string',
            'date' => 'required|date_format:Y-m-d'
        ]);

        $voucher = Voucher::where('flight_number', $request->flightNumber)
            ->where('flight_date', $request->date)
            ->first();

        $exists = $voucher !== null;

        return response()->json([
            'success' => true,
            'data' => new VoucherCheckResource([
                'exists' => $exists,
                'flight_number' => $request->flightNumber,
                'flight_date' => $request->date
            ]),
            'message' => $exists
                ? 'Vouchers already exist for this flight and date.'
                : 'No vouchers yet for this flight and date.'
        ]);
    }


    // POST /api/generate
    public function generate(VoucherRequest $request): JsonResponse
    {
        // Cek duplikasi
        $exists = Voucher::where('flight_number', $request->flightNumber)
            ->where('flight_date', $request->date)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Vouchers already generated for this flight and date.'
            ], 422);
        }

        // Generate seats
        $seats = $this->seatService->generate($request->aircraft, 3);

        $voucher = Voucher::create([
            'crew_name' => $request->name,
            'crew_id' => $request->id,
            'flight_number' => $request->flightNumber,
            'flight_date' => $request->date,
            'aircraft_type' => $request->aircraft,
            'seat1' => $seats[0],
            'seat2' => $seats[1],
            'seat3' => $seats[2],
        ]);

        return response()->json([
            'success' => true,
            'data' => new VoucherResource($voucher),
            'message' => 'Voucher generated successfully.'
        ]);

      
    }

    public function destroy(int $id): JsonResponse
    {
        $voucher = Voucher::find($id);

        if (!$voucher) {
            return response()->json([
                'success' => false,
                'message' => 'Voucher not found.'
            ], 404);
        }

        $voucher->delete();

        return response()->json([
            'success' => true,
            'message' => 'Voucher deleted successfully.'
        ]);
    }
}
