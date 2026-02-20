<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\CrewController;
use App\Http\Controllers\FlightDetailController;


Route::post('/check', [VoucherController::class, 'check']);
Route::post('/generate', [VoucherController::class, 'generate']);
Route::apiResource('crews', CrewController::class);
Route::apiResource('flights', FlightDetailController::class);
Route::get('/vouchers', [VoucherController::class, 'index']);
Route::delete('/vouchers/{id}', [VoucherController::class, 'destroy']);

Route::get('/test', function () {
    return response()->json(['message' => 'Laravel 12 API works!']);
});

