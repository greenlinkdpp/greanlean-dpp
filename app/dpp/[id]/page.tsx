"use client"
import { supabase } from "@/lib/supabase"
import { QRCodeSVG } from "qrcode.react"
import QRCodeBox from "@/components/QRCodeBox"

export default async function DPPPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (!product) {
    return (
      <div
        style={{
          background: "#0A0A0A",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        Product Not Found
      </div>
    )
  }

  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        color: "#fff",
        padding: "60px 24px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* 顶部 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          <div>
            <div
              style={{
                color: "#00FF99",
                fontSize: "14px",
                marginBottom: "12px",
                letterSpacing: "2px",
              }}
            >
              DIGITAL PRODUCT PASSPORT
            </div>

            <h1
              style={{
                fontSize: "64px",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              {product.product_name}
            </h1>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  color: "#00FF99",
                }}
              >
                SKU · {product.sku}
              </div>

              <div
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  padding: "10px 18px",
                  borderRadius: "999px",
                }}
              >
                {product.brand}
              </div>
            </div>
          </div>

          {/* 二维码占位 */}
          <div
            style={{
              width: "160px",
              height: "160px",
              background: "#111",
              border: "1px solid #222",
              borderRadius: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#666",
              fontSize: "14px",
            }}
          >
            <QRCodeSVG
                value={`http://localhost:3000/dpp/${product.id}`}
                size={140}
                bgColor={"#111"}
                fgColor={"#00FF99"}
            />
          </div>
        </div>

        {/* 数据卡片 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "24px",
          }}
        >
          <Card
            title="Carbon Footprint"
            value={`${product.carbon_footprint || "-"} kg CO₂e`}
          />

          <Card
            title="Country of Origin"
            value={product.country_of_origin || "-"}
          />

          <Card
            title="Material"
            value={product.material || "-"}
          />

          <Card
            title="Recyclability"
            value={product.recyclability || "-"}
          />

          <Card
            title="GOTS Certified"
            value={product.gots_certified || "-"}
          />

          <Card
            title="OEKO TEX"
            value={product.oeko_tex || "-"}
          />

          <Card
            title="SVHC Status"
            value={product.svhc_status || "-"}
          />
        </div>

        {/* ESG Footer */}
        <div
          style={{
            marginTop: "80px",
            paddingTop: "40px",
            borderTop: "1px solid #1A1A1A",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                color: "#00FF99",
                marginBottom: "12px",
                fontSize: "14px",
              }}
            >
              EU DPP READY
            </div>

            <div
              style={{
                color: "#888",
                lineHeight: 1.8,
              }}
            >
              This digital product passport provides
              traceability and sustainability data
              aligned with future EU ESG & ESPR
              regulations.
            </div>
          </div>

          <div
            style={{
              color: "#666",
              fontSize: "14px",
            }}
          >
            Powered by GreanLean
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #1E1E1E",
        borderRadius: "28px",
        padding: "32px",
      }}
    >
      <div
        style={{
          color: "#777",
          marginBottom: "16px",
          fontSize: "14px",
          letterSpacing: "1px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "28px",
          fontWeight: 600,
          lineHeight: 1.4,
        }}
      >
        {value}
      </div>
    </div>
  )
}