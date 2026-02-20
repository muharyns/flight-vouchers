"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Icon } from "@iconify/react";
import VoucherList from "./VoucherList";
import useVoucher from "@/hooks/useVoucher";

const Form = ({ onSuccess, data, setData }) => {
  const { generateVoucher, loading, error, errors, seats } = useVoucher();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(undefined);

  const [form, setForm] = useState({
    name: "",
    id: "",
    flightNumber: "",
    date: "",
    aircraft: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [successMessage, setSuccessMessage] = useState("");

  const handleDateSelect = (selectedDate) => {
    if (!selectedDate) return;

    setDate(selectedDate);
    setOpen(false);

    // format YYYY-MM-DD (sesuai backend Laravel)
    const formatted = selectedDate.toLocaleDateString("en-CA");

    setForm((prev) => ({
      ...prev,
      date: formatted,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //generateVoucher(form);
    const success = await generateVoucher(form);

    if (success) {
      setData(success.data?.data || {}); // Update the data state with the response from the API

      onSuccess();
      
      setSuccessMessage(
        success.data.message || "Voucher generated successfully!",
      );
      setForm({
        name: "",
        id: "",
        flightNumber: "",
        date: "",
        aircraft: "",
      });

      setDate(undefined);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <div className="grid gap-6 grid-cols-1 xl:grid-cols-1">
      <div className="flex flex-col gap-6">
        <h5 className="card-title">Seat Voucher Generator</h5>

        {error && <div className="text-red-600 font-medium">{error}</div>}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md font-medium">
            {successMessage}
          </div>
        )}

        <div className="rounded-xl shadow-xs bg-background md:p-6 p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Crew Name */}
            <div>
              <Label>Crew Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                // required
                className={`mt-2 ${errors?.name ? "border-red-500" : ""}`}
              />
              {errors?.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
              )}
            </div>

            {/* Crew ID */}
            <div>
              <Label>Crew ID</Label>
              <Input
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="123456"
                //required
                className={`mt-2 ${errors?.id ? "border-red-500" : ""}`}
              />
              {errors?.id && (
                <p className="text-red-500 text-sm mt-1">{errors.id[0]}</p>
              )}
            </div>

            {/* Flight Number */}
            <div>
              <Label>Flight Number</Label>
              <Input
                name="flightNumber"
                value={form.flightNumber}
                onChange={handleChange}
                placeholder="GA102"
                // required
                className={`mt-2 ${errors?.flightNumber ? "border-red-500" : ""}`}
              />
              {errors?.flightNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.flightNumber[0]}
                </p>
              )}
            </div>

            {/* Flight Date */}
            <div>
              <Label>Flight Date</Label>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-between mt-2 ${errors?.date ? "border-red-500" : ""}`}
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <Icon
                      icon="solar:calendar-minimalistic-linear"
                      width={18}
                    />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>

              {errors?.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date[0]}</p>
              )}
            </div>

            {/* Aircraft Type */}
            <div>
              <Label>Aircraft Type</Label>

              <Select
                value={form.aircraft}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    aircraft: value,
                  }))
                }
              >
                <SelectTrigger
                  className={`mt-2 w-full ${errors?.aircraft ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select aircraft" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ATR">ATR</SelectItem>
                  <SelectItem value="Airbus 320">Airbus 320</SelectItem>
                  <SelectItem value="Boeing 737 Max">Boeing 737 Max</SelectItem>
                </SelectContent>
              </Select>
              {errors?.aircraft && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.aircraft[0]}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate Voucher"}
            </Button>
          </form>

          {/* {seats.length > 0 && (
            <div className="mt-4">
              <h2 className="font-bold">Assigned Seats:</h2>
              <ul className="list-disc list-inside">
                {seats.map((seat, idx) => (
                  <li key={idx}>{seat}</li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Form;
