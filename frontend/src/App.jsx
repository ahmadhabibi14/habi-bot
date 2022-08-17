import { NavLink, Outlet, useNavigate } from "react-router-dom";

function App() {
  if(!localStorage.getItem("Lxpx")){
    window.location.href = "/login"
    console.log(localStorage.getItem("Lxpx"))
  }

  return (
    <section className="flex flex-row space-x-4 p-6 text-slate-900">
      {/* Navigasi Bar */}
      <nav className="flex flex-col space-y-3 mt-6">
        <NavLink
          exact
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-emerald-500 py-2 px-6 text-slate-50"
              : "bg-slate-300 py-2 px-6"
          }
        >
          DASHBOARD
        </NavLink>
        <NavLink
          to="/tl-board"
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
        {/*LAin route*/}
        <Outlet />
      </main>
    </section>
  );
}

export default App;
