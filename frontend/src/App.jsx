import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <section className="flex flex-row space-x-4 p-6 text-slate-900">
      {/* Navigasi Bar */}
      <nav className="flex flex-col space-y-3 mt-6">
        <NavLink
          exact
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-emerald-500 py-2 px-6 text-slate-50 rounded-lg"
              : "hover:bg-slate-200 bg-slate-300 py-2 px-6 rounded-lg"
          }
        >
          DASHBOARD
        </NavLink>
        <NavLink
          to="/tl-board"
          className={({ isActive }) =>
            isActive
              ? "bg-emerald-500 py-2 px-6 text-slate-50 rounded-lg"
              : "hover:bg-slate-200 bg-slate-300 py-2 px-6 rounded-lg"
          }
        >
          TL BOARD
        </NavLink>
      </nav>

      {/* Dashboard */}
      <main className="w-full rounded-lg border-2 border-slate-900 mt-2 p-4 min-h-max">
        {/*LAin route*/}
        <Outlet />
      </main>
    </section>
  );
}

export default App;
