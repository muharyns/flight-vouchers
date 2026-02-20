<?php

namespace App\Http\Controllers;

use App\Models\FlightDetail;
use Illuminate\Http\Request;

class FlightDetailController extends Controller
{
    public function index()
    {
        return FlightDetail::latest()->paginate(10);
    }

    public function store(Request $request)
    {
        $request->validate([
            'flight_number' => 'required|string',
            'aircraft_type' => 'required|string',
           
        ]);

        $flight = FlightDetail::create($request->all());

        return response()->json($flight, 201);
    }

    public function show($id)
    {
        return FlightDetail::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $flight = FlightDetail::findOrFail($id);
        $flight->update($request->all());

        return response()->json($flight);
    }

    public function destroy($id)
    {
        $flight = FlightDetail::findOrFail($id);
        $flight->delete();

        return response()->json([
            'message' => 'Flight deleted successfully'
        ]);
    }
}
