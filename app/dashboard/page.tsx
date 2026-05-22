"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([])

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")

    if (data) {
      setProducts(data)
    }

    console.log(data)
    console.log(error)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (!file) return

    const data = await file.arrayBuffer()

    const workbook = XLSX.read(data)

    const sheet = workbook.Sheets[workbook.SheetNames[0]]

    const jsonData = XLSX.utils.sheet_to_json(sheet)

    for (const item of jsonData as any[]) {
      await supabase.from("products").insert({
        product_name: item.product_name,
        sku: item.sku,
        brand: item.brand,
        carbon_footprint: item.carbon_footprint,
        country_of_origin: item.country_of_origin,
        material: item.material,
        recyclability: item.recyclability,
        gots_certified: item.gots_certified,
        oeko_tex: item.oeko_tex,
        svhc_status: item.svhc_status,
      })
    }

    alert("上传成功")

    loadProducts()
  }

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "64px",
          marginBottom: "40px",
        }}
      >
        DPP Dashboard
      </h1>

      <input
        type="file"
        accept=".xlsx"
        onChange={handleUpload}
      />

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #333",
              borderRadius: "20px",
              padding: "24px",
              maxWidth: "600px",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              {product.product_name}
            </h2>

            <div style={{ marginBottom: "10px" }}>
              ID: {product.id}
            </div>

            <div style={{ marginBottom: "10px" }}>
              SKU: {product.sku}
            </div>

            <div style={{ marginBottom: "10px" }}>
              Carbon: {product.carbon_footprint}
            </div>

            <a
              href={`/dpp/${product.id}`}
              target="_blank"
              style={{
                color: "#00ff99",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              查看 DPP →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}