import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  ShoppingCart,
  BarChart2,
  Users,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Inicio" },
  { to: "/inventory", icon: Package, label: "Inventario" },
  { to: "/reception", icon: ClipboardList, label: "Actas de Recepción" },
  { to: "/pos", icon: ShoppingCart, label: "Punto de Venta" },
  { to: "/reports", icon: BarChart2, label: "Reportes" },
  { to: "/users", icon: Users, label: "Usuarios" },
];

const Sidebar = () => {
  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4">
        <img
          src="https://www.sena.edu.co/Style%20Library/alayout/images/logoSena.png"
          alt="Logo SENA"
          className="h-16 mx-auto mb-4"
        />
        <h2 className="text-primary font-bold text-center text-lg">
          Droguería SENA
        </h2>
        <p className="text-gray-600 text-sm text-center">
          Centro de Servicios de Salud Regional Antioquia
        </p>
      </div>

      <nav className="mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-secondary transition-colors ${
                isActive ? "bg-secondary border-r-4 border-primary" : ""
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
