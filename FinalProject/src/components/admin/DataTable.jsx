import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog.jsx";

const rupiah = (n) => new Intl.NumberFormat("id-ID").format(n);

export default function DataTable({ data }) {
  return (
    <section className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="p-5 border-b flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Daftar Produk</h2>
        </div>

        <div className="inline-flex items-center gap-2">
          <span className="text-xs text-slate-500">Total</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {data.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="bg-slate-50 text-slate-700">
              <TableHead className="p-3 border-b">Nama</TableHead>
              <TableHead className="p-3 border-b">Harga</TableHead>
              <TableHead className="p-3 border-b">Stok</TableHead>
              <TableHead className="p-3 border-b">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell className="p-6 text-center text-slate-500" colSpan={4}>
                  Belum ada data produk.
                </TableCell>
              </TableRow>
            ) : (
              data.map((p) => (
                <TableRow key={p.id} className="hover:bg-slate-50">
                  <TableCell className="p-3 border-b font-medium text-slate-900">
                    {p.name}
                  </TableCell>

                  <TableCell className="p-3 border-b text-slate-700">
                    Rp {rupiah(p.price)}
                  </TableCell>

                  <TableCell className="p-3 border-b">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold " +
                        (p.stock > 0
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700")
                      }
                    >
                      {p.stock > 0 ? `${p.stock} tersedia` : "Habis"}
                    </span>
                  </TableCell>

                  <TableCell className="p-3 border-b">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="rounded-xl border border-slate-200 hover:bg-slate-50 px-3 py-2 text-xs font-medium active:scale-[0.98] transition"
                        onClick={() => console.log("Edit clicked:", p.id)}
                      >
                        Edit
                      </button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-3 py-2 text-xs font-medium active:scale-[0.98] transition">
                            Hapus
                          </button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Hapus produk?</DialogTitle>
                            <DialogDescription>
                              Produk <b>{p.name}</b> akan dihapus (dummy). Aksi ini tidak bisa dibatalkan.
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <DialogClose asChild>
                              <button className="rounded-xl border border-slate-200 hover:bg-slate-50 px-4 py-2 text-sm font-medium">
                                Batal
                              </button>
                            </DialogClose>

                            <DialogClose asChild>
                              <button
                                className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 text-sm font-medium"
                                onClick={() => console.log("Hapus clicked:", p.id)}
                              >
                                Ya, Hapus
                              </button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}