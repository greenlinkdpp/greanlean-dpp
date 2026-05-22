"use client"

import { QRCodeSVG } from "qrcode.react"

export default function QRCodeBox({
  id,
}: {
  id: string
}) {
  return (
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
      }}
    >
      <QRCodeSVG
        value={`http://localhost:3000/dpp/${id}`}
        size={120}
        bgColor={"#111"}
        fgColor={"#00FF99"}
      />
    </div>
  )
}