import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const SalesBarChart = ({ data, title = "Vendas por Produto" }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "4px",
        border: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "15px",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        {title}
      </h3>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#4285f4" name="Quantidade" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalesBarChart
