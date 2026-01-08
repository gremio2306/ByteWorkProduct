import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

const rupiah = (n) => new Intl.NumberFormat("id-ID").format(n);

export default function DataTable({ data, onEdit, onDelete }) {
  return (
    <section className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-[#0B1B3A]">Daftar Produk</h3>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-175">
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Nama</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-50">
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>Rp {rupiah(p.price)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.stock > 0 ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-600"
                  }`}>
                    {p.stock > 0 ? `${p.stock} tersedia` : "Habis"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      className="border border-blue-200 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-50"
                      onClick={() => onEdit(p)}
                    >
                      Edit
                    </button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                          Hapus
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Hapus produk?</DialogTitle>
                          <DialogDescription>{p.name} akan dihapus.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <button className="px-4 py-2 border rounded-lg">Batal</button>
                          </DialogClose>
                          <DialogClose asChild>
                            <button
                              className="px-4 py-2 bg-red-600 text-white rounded-lg"
                              onClick={() => onDelete(p.id)}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
