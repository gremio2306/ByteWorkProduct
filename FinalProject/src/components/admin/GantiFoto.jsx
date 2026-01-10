import { useEffect, useState } from "react";
import { Image as ImageIcon, UploadCloud } from "lucide-react";
import AdminLayout from "./AdminLayout";

export default function GantiFoto() {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_photo_preview");
    if (saved) setPreview(saved);
  }, []);

  const onPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    localStorage.setItem("admin_photo_preview", url);
  };

  return (
    <AdminLayout>
      <div className="rounded-2xl border bg-white shadow-sm p-4 sm:p-5">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <ImageIcon className="h-5 w-5" />
          Ganti Foto
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Upload avatar admin (dummy).
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-4 items-start">
          <div className="h-28 w-28 rounded-2xl border bg-slate-50 overflow-hidden flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="preview" className="h-full w-full object-cover" />
            ) : (
              <div className="text-slate-400 text-sm">No Photo</div>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Pilih Foto
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <UploadCloud className="h-4 w-4 text-slate-400" />
              <input type="file" accept="image/*" onChange={onPick} className="w-full text-sm" />
            </div>

            <div className="mt-3 text-xs text-slate-500">
              *Disimpan lokal untuk demo (localStorage).
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
