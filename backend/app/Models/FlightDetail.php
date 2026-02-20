<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightDetail extends Model
{
    protected $fillable = [
        'flight_number',
        'flight_date',
        'aircraft_type',
        
    ];
}
