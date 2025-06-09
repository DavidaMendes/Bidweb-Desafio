"use client"

import { useState, useEffect } from "react"

const SaleModal = ({ isOpen, onClose, onSave, sale = null }) => {
  const [formData, setFormData] = useState({
    product: {
      name: "",
      unitPrice: "",
    },
    quantity: "",
    saleDate: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sale) {
      setFormData({
        product: {
          name: sale.product.name,
          unitPrice: sale.product.unitPrice,
        },
        quantity: sale.quantity,
        saleDate: sale.saleDate,
      })
    } else {
      setFormData({
        product: {
          name: "",
          unitPrice: "",
        },
        quantity: "",
        saleDate: new Date().toISOString().split("T")[0],
      })
    }
  }, [sale, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith("product.")) {
      const productField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        product: {
          ...prev.product,
          [productField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const saleData = {
        product: {
          name: formData.product.name,
          unitPrice: Number.parseFloat(formData.product.unitPrice),
        },
        quantity: Number.parseInt(formData.quantity),
        saleDate: formData.saleDate,
      }

      await onSave(saleData)
      onClose()
    } catch (error) {
      console.error("Erro ao salvar venda:", error)
      alert("Erro ao salvar venda")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          width: "90%",
          maxWidth: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <h2 style={{ fontSize: "20px" }}>{sale ? "Editar Venda" : "Nova Venda"}</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Nome do Produto</label>
            <input
              type="text"
              name="product.name"
              value={formData.product.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Preço Unitário</label>
            <input
              type="number"
              name="product.unitPrice"
              step="0.01"
              value={formData.product.unitPrice}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Quantidade</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Data da Venda</label>
            <input
              type="date"
              name="saleDate"
              value={formData.saleDate}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 15px",
                backgroundColor: "#f1f1f1",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                width: "48%",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "8px 15px",
                backgroundColor: "#4285f4",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "48%",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SaleModal
