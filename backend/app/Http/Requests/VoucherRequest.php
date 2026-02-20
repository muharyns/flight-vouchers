<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VoucherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'id' => 'required|string|max:255',
            'flightNumber' => 'required|string|max:255',
            'date' => 'required|date_format:Y-m-d',
            'aircraft' => 'required|in:ATR,Airbus 320,Boeing 737 Max'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Crew Name is required.',
            'id.required' => 'Crew ID is required.',
            'flightNumber.required' => 'Flight Number is required.',
            'date.required' => 'Flight Date is required.',
            'date.date_format' => 'Date format must be YYYY-MM-DD.',
            'aircraft.in' => 'Aircraft must be ATR, Airbus 320, or Boeing 737 Max.'
        ];
    }
}
