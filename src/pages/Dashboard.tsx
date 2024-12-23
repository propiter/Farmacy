import React from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  DollarSign, 
  Package 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const mockData = {
  stats: {
    alerts: 12,
    lowStock: 8,
    dailySales: 2500000,
    totalProducts: 450
  },
  salesData: [
    { name: 'Lun', sales: 1200000 },
    { name: 'Mar', sales: 1800000 },
    { name: 'Mie', sales: 1400000 },
    { name: 'Jue', sales: 2200000 },
    { name: 'Vie', sales: 1900000 },
    { name: 'Sab', sales: 2800000 },
    { name: 'Dom', sales: 2000000 },
  ]
};

const StatCard = ({ icon: Icon, title, value, color }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Bienvenido al sistema de Droguería SENA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={AlertTriangle}
          title="Alertas Activas"
          value={mockData.stats.alerts}
          color="bg-danger"
        />
        <StatCard
          icon={TrendingDown}
          title="Productos Bajo Stock"
          value={mockData.stats.lowStock}
          color="bg-warning"
        />
        <StatCard
          icon={DollarSign}
          title="Ventas del Día"
          value={formatCurrency(mockData.stats.dailySales)}
          color="bg-primary"
        />
        <StatCard
          icon={Package}
          title="Total Productos"
          value={mockData.stats.totalProducts}
          color="bg-alert"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Ventas de la Semana</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `${value / 1000000}M`}
                label={{ 
                  value: 'Ventas (Millones COP)', 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip 
                formatter={(value: any) => formatCurrency(value)}
                labelFormatter={(label) => `Día: ${label}`}
              />
              <Bar dataKey="sales" fill="#28a745" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;