const BASE_URL = "https://6965f018f6de16bde44b9169.mockapi.io/products";

export async function getProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Gagal mengambil data products");
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Produk tidak ditemukan");
  return res.json();
}

export async function addProduct(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Gagal menambah product");
  return res.json();
}

export async function updateProduct(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Gagal update product");
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Gagal hapus product");
  return true;
}
