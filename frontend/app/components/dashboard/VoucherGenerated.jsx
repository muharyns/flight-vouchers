import React from "react";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

const getSeatVariant = (seat) => {
  if (!seat) return "outline";

  if (seat.includes("A")) return "primary";
  if (seat.includes("B")) return "info";
  if (seat.includes("C")) return "warning";

  return "success";
};

const VoucherGenerated = ({ VoucherData = {}, className = "" }) => {
  const {
    crew_name,
    crew_id,
    flight_number,
    aircraft_type,
    flight_date,
    seats = [],
  } = VoucherData;

  if (!seats.length) return null;

  return (
    <div className="grid gap-6 grid-cols-1 xl:grid-cols-1">
      <div className="flex flex-col gap-6">
        <h5 className="card-title"> Voucher Generated</h5>

        <div
          className={`bg-white dark:bg-darkgray rounded-xl shadow-xs p-6 ${className}`}
        >
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Icon
                icon="solar:user-outline"
                height={22}
                className="text-primary"
              />
              <div>
                <p className="text-sm text-gray-500">Crew Name</p>
                <p className="font-semibold">{crew_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Crew ID</p>
                <p className="font-semibold">{crew_id}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon
                icon="solar:airplane-outline"
                height={22}
                className="text-info"
              />
              <div>
                <p className="text-sm text-gray-500">Flight</p>
                <p className="font-semibold">{flight_number}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Flight</p>
                <p className="font-semibold">{flight_date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon
                icon="solar:plane-2-outline"
                height={22}
                className="text-warning"
              />
              <div>
                <p className="text-sm text-gray-500">Aircraft Type</p>
                <p className="font-semibold">{aircraft_type}</p>
              </div>
            </div>
          </div>

          {/* Seats */}
          <div className="flex flex-wrap gap-3">
            {seats.map((seat, index) => (
              <Badge key={index} variant={getSeatVariant(seat)}>
                <Icon icon="solar:chair-outline" height={14} className="mr-1" />
                {seat}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherGenerated;
