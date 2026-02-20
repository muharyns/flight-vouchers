"use client";
import { useState, useEffect } from "react";
import Form from "../components/dashboard/Form";
import Link from "next/link";
import VoucherList from "../components/dashboard/VoucherList";
import VoucherGenerated from "../components/dashboard/VoucherGenerated";
const page = () => {
  const [refreshKey, setRefreshKey] = useState(0);
   const handleSuccess = () => {
     setRefreshKey((prev) => prev + 1);
  };
    const [generateData, setGenerateData] = useState({});

  useEffect(() => {
    console.log("Data for Form component:", generateData);
  }, [generateData]);
    // This is just an example of how you might set the data to be passed to the Form component
    // You can replace this with your actual data fetching logic
  return (
    <>
      <div className="grid grid-cols-12 lg:gap-30">
        <div className="lg:col-span-6 col-span-12">
          <Form
            onSuccess={handleSuccess}
            data={generateData}
            setData={setGenerateData}
          />
        </div>

        <div className="lg:col-span-6 col-span-12">
         
          <VoucherGenerated VoucherData={generateData} />
        </div>
        <div className="lg:col-span-12 col-span-12">
          <VoucherList refreshKey={refreshKey} />
        </div>

        {/* <div className="col-span-12 text-center">
          <p className="text-base">
            Design and Developed by{" "}
            <Link
              href="https://adminmart.com/"
              target="_blank"
              className="pl-1 text-primary underline decoration-primary"
            >
              adminmart.com{" "}
            </Link>
            • Distributed by{" "}
            <Link
              href="https://themewagon.com/"
              target="_blank"
              className="pl-1 text-primary underline decoration-primary"
            >
              ThemeWagon
            </Link>
          </p>
        </div> */}
      </div>
    </>
  );
};

export default page;
