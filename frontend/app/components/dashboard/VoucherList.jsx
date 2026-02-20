"use client";

import { useEffect } from "react";
import useVoucher from "@/hooks/useVoucher";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function VoucherList({ refreshKey = 0 }) {
  const {
    vouchers,
    currentPage,
    lastPage,
    loadingList,
    fetchVouchers,
    setCurrentPage,
    handleDeleteVoucher,
  } = useVoucher();

  useEffect(() => {
    fetchVouchers(currentPage);
  }, [currentPage, refreshKey]);

  return (
    <div className="grid gap-6 grid-cols-1 xl:grid-cols-1">
      <div className="flex flex-col gap-6">
        <h5 className="card-title">Voucher List</h5>

        {loadingList ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="bg-white shadow rounded-lg p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crew</TableHead>
                    <TableHead>Flight</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Aircraft</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {vouchers.map((voucher) => (
                    <TableRow key={voucher.id}>
                      <TableCell>
                        {voucher.crew_name}
                        <div className="text-xs text-gray-500">
                          {voucher.crew_id}
                        </div>
                      </TableCell>

                      <TableCell>{voucher.flight_number}</TableCell>

                      <TableCell>{voucher.flight_date}</TableCell>

                      <TableCell>{voucher.aircraft_type}</TableCell>

                      <TableCell className="flex gap-2">
                        <span className="bg-green-100 px-2 py-1 rounded text-xs">
                          {voucher.seat1}
                        </span>
                        <span className="bg-green-100 px-2 py-1 rounded text-xs">
                          {voucher.seat2}
                        </span>
                        <span className="bg-green-100 px-2 py-1 rounded text-xs">
                          {voucher.seat3}
                        </span>
                      </TableCell>

                      <TableCell>
                        <button
                          onClick={() => handleDeleteVoucher(voucher.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {lastPage}
              </span>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
