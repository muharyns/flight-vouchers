<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Voucher extends Model
{
    use HasFactory; 
    protected $fillable = [
        'crew_name',
        'crew_id',
        'flight_number',
        'flight_date',
        'aircraft_type',
        'seat1',
        'seat2',
        'seat3'
    ];
}
