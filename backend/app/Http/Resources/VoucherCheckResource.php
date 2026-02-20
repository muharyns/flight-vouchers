<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VoucherCheckResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'exists' => $this['exists'] ?? $this->resource->exists,
            'flight_number' => $this['flight_number'] ?? $this->resource->flight_number,
            'flight_date' => $this['flight_date'] ?? $this->resource->flight_date,
        ];
    }
}
