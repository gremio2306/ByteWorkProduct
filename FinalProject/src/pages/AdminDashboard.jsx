import { useState } from "react";
import AdminHeader from "../components/admin/AdminHeader";
import FormData from "../components/admin/FormData";
import DataTable from "../components/admin/DataTable";
import dummyProducts from "../data/dummyProducts";


export default function AdminDashboard() {
  const [data] = useState(dummyProducts);

  return (
    <>
      <AdminHeader />

      <main className="p-4 space-y-3">
        <FormData />
        <DataTable data={data} />
      </main>
    </>
  );
}
