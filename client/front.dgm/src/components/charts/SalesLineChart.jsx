import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const SalesLineChart = ({ data, title = "Evolução das Vendas" }) => {
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
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalValue" stroke="#0f9d58" strokeWidth={2} name="Valor Total" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalesLineChart
