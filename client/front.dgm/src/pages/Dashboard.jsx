"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { salesService } from "../services/api"
import SaleCard from "../components/sales/SaleCard"
import SaleModal from "../components/sales/SaleModal"
import SalesBarChart from "../components/charts/SalesBarChart"
import SalesLineChart from "../components/charts/SalesLineChart"
import { format } from "date-fns"

const Dashboard = () => {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSale, setEditingSale] = useState(null)
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  })
  const [error, setError] = useState("")

  const { user, logout } = useAuth()

  useEffect(() => {
    loadSales()
  }, [])

  const loadSales = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await salesService.getAll()
      setSales(data)
    } catch (error) {
      console.error("Erro ao carregar vendas:", error)
      setError("Erro ao carregar vendas. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSale = async (saleData) => {
    try {
      await salesService.create(saleData)
      await loadSales()
    } catch (error) {
      throw error
    }
  }

  const handleUpdateSale = async (saleData) => {
    try {
      await salesService.update(editingSale.id, saleData)
      await loadSales()
      setEditingSale(null)
    } catch (error) {
      throw error
    }
  }

  const handleDeleteSale = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta venda?")) {
      try {
        await salesService.delete(id)
        await loadSales()
      } catch (error) {
        console.error("Erro ao excluir venda:", error)
        alert("Erro ao excluir venda")
      }
    }
  }

  const handleEditSale = (sale) => {
    setEditingSale(sale)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingSale(null)
  }

  const handleSave = async (saleData) => {
    if (editingSale) {
      await handleUpdateSale(saleData)
    } else {
      await handleCreateSale(saleData)
    }
  }

  const filteredSales = sales.filter((sale) => {
    if (!dateFilter.startDate && !dateFilter.endDate) return true

    const saleDate = new Date(sale.saleDate)
    const start = dateFilter.startDate ? new Date(dateFilter.startDate) : null
    const end = dateFilter.endDate ? new Date(dateFilter.endDate) : null

    if (start && end) {
      return saleDate >= start && saleDate <= end
    } else if (start) {
      return saleDate >= start
    } else if (end) {
      return saleDate <= end
    }

    return true
  })

  const barChartData = filteredSales.reduce((acc, sale) => {
    const existing = acc.find((item) => item.name === sale.product.name)
    if (existing) {
      existing.quantity += sale.quantity
    } else {
      acc.push({
        name: sale.product.name,
        quantity: sale.quantity,
      })
    }
    return acc
  }, [])

  const lineChartData = filteredSales
    .reduce((acc, sale) => {
      const date = format(new Date(sale.saleDate), "dd/MM")
      const existing = acc.find((item) => item.date === date)
      if (existing) {
        existing.totalValue += sale.totalValue
        existing.quantity += sale.quantity
      } else {
        acc.push({
          date,
          totalValue: sale.totalValue,
          quantity: sale.quantity,
        })
      }
      return acc
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #3498db",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 2s linear infinite",
              margin: "0 auto",
            }}
          ></div>
          <p style={{ marginTop: "20px" }}>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      {}
      <header
        style={{
          backgroundColor: "#4285f4",
          color: "white",
          padding: "15px 0",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Sistema de Vendas</h1>
            <p style={{ fontSize: "14px" }}>Bem-vindo, {user?.login}</p>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: "8px 15px",
                backgroundColor: "white",
                color: "#4285f4",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Nova Venda
            </button>
            <button
              onClick={logout}
              style={{
                padding: "8px 15px",
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        {error && (
          <div
            style={{
              backgroundColor: "#ffebee",
              color: "#c62828",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "20px",
              border: "1px solid #ef9a9a",
            }}
          >
            {error}
          </div>
        )}

        {}
        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "4px",
            marginBottom: "20px",
            border: "1px solid #ddd",
          }}
        >
          <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Filtros</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Data Inicial</label>
              <input
                type="date"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter((prev) => ({ ...prev, startDate: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Data Final</label>
              <input
                type="date"
                value={dateFilter.endDate}
                onChange={(e) => setDateFilter((prev) => ({ ...prev, endDate: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
          {(dateFilter.startDate || dateFilter.endDate) && (
            <button
              onClick={() => setDateFilter({ startDate: "", endDate: "" })}
              style={{
                padding: "5px 10px",
                backgroundColor: "#f1f1f1",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Limpar Filtros
            </button>
          )}
        </div>

        {}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <SalesBarChart data={barChartData} />
          <SalesLineChart data={lineChartData} />
        </div>

        {}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Vendas ({filteredSales.length})</h2>

          {filteredSales.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "30px 0",
                backgroundColor: "white",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            >
              <p style={{ marginBottom: "15px", color: "#666" }}>Nenhuma venda encontrada</p>
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#4285f4",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Criar primeira venda
              </button>
            </div>
          ) : (
            <div>
              {filteredSales.map((sale) => (
                <SaleCard key={sale.id} sale={sale} onEdit={handleEditSale} onDelete={handleDeleteSale} />
              ))}
            </div>
          )}
        </div>
      </div>

      {}
      <SaleModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} sale={editingSale} />
    </div>
  )
}

export default Dashboard
