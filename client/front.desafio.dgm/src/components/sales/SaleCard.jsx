"use client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const SaleCard = ({ sale, onEdit, onDelete }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR })
    } catch {
      return dateString
    }
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "15px",
        marginBottom: "15px",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{sale.product.name}</h3>
          <p style={{ fontSize: "14px", color: "#666" }}>Venda #{sale.id}</p>
        </div>
        <div>
          <button
            onClick={() => onEdit(sale)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#4285f4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              marginRight: "5px",
              cursor: "pointer",
            }}
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(sale.id)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#db4437",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Excluir
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div>
          <p style={{ fontSize: "14px", color: "#666" }}>Quantidade:</p>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>{sale.quantity}</p>
        </div>
        <div>
          <p style={{ fontSize: "14px", color: "#666" }}>Preço Unitário:</p>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>{formatCurrency(sale.product.unitPrice)}</p>
        </div>
        <div>
          <p style={{ fontSize: "14px", color: "#666" }}>Data da Venda:</p>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>{formatDate(sale.saleDate)}</p>
        </div>
        <div>
          <p style={{ fontSize: "14px", color: "#666" }}>Valor Total:</p>
          <p style={{ fontSize: "16px", fontWeight: "bold", color: "green" }}>{formatCurrency(sale.totalValue)}</p>
        </div>
      </div>
    </div>
  )
}

export default SaleCard
