import { Outlet, Link, NavLink,useNavigate } from "react-router-dom";
import  Login from "./login.jsx"

function Home() {
  return (
    <section className="flex flex-row space-x-4 p-6 text-slate-900">
      {/* Navigasi Bar */}
      <nav className="flex flex-col space-y-3 mt-6">
        <NavLink
          exact
          to="/home/"
          className={({ isActive }) =>
            isActive
              ? "bg-emerald-500 py-2 px-6 text-slate-50"
              : "bg-slate-300 py-2 px-6"
          }
        >
          DASHBOARD
        </NavLink>
        {/* Navigasi Bar */}
        <NavLink
          to="/home/add"
          className={({ isActive }) =>
          isActive
            ? "bg-emerald-500 py-2 px-6 text-slate-50"
            : "bg-slate-300 py-2 px-6"
          }
        >
          ADD TEKNISI
        </NavLink>
        <NavLink
          to="/home/tl-board"
          className={({ isActive }) =>
            isActive
              ? "bg-emerald-500 py-2 px-6 text-slate-50"
              : "bg-slate-300 py-2 px-6"
          }
        >
          TL BOARD
        </NavLink>
      </nav>

      {/* Dashboard */}
      <main className="w-full border-2 border-slate-900 mt-2 p-4 min-h-max">
        <Outlet />
      </main>
    </section>
  );
}

export default Home;
