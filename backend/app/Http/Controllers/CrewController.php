<?php

namespace App\Http\Controllers;

use App\Models\Crew;
use Illuminate\Http\Request;

class CrewController extends Controller
{
    public function index()
    {
        return Crew::latest()->paginate(10);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'crew_id' => 'required|string|unique:crews',
        ]);

        $crew = Crew::create($request->all());

        return response()->json($crew, 201);
    }

    public function show($id)
    {
        return Crew::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $crew = Crew::findOrFail($id);

        $crew->update($request->all());

        return response()->json($crew);
    }

    public function destroy($id)
    {
        $crew = Crew::findOrFail($id);
        $crew->delete();

        return response()->json([
            'message' => 'Crew deleted successfully'
        ]);
    }
}
