import {
  NavLink,
  Outlet,
  useNavigate,
  Navigate,
  Redirect,
} from "react-router-dom";
import axios from "axios";
function App() {
  axios
    .get("http://localhost:8887/leader/login", {
      withCredentials: true,
    })
    .then((res) => {
      let user = res.data;
      localStorage.setItem("Lxpx", JSON.stringify(user));
    })
    .catch((e) => {
      // console.log(e)
      localStorage.clear();
      return <Navigate to="/login" replace />;
    });
  if (!localStorage.getItem("Lxpx")) {
    window.location.href = "/login";
    return <Navigate to="/login" replace />;
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
              ? "bg-emerald-500 py-2 px-6 text-slate-50 rounded-lg"
              : "hover:bg-slate-200 bg-slate-300 py-2 px-6 rounded-lg"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tl-board"
          className={({ isActive }) =>
            isActive
              ? "bg-emerald-500 py-2 px-6 text-slate-50 rounded-lg"
              : "hover:bg-slate-200 bg-slate-300 py-2 px-6 rounded-lg"
          }
        >
          TL Board
        </NavLink>
        <NavLink
          to="/add-teknisi"
          className={({ isActive }) =>
            isActive
              ? "bg-emerald-500 py-2 px-6 text-slate-50 rounded-lg"
              : "hover:bg-slate-200 bg-slate-300 py-2 px-6 rounded-lg"
          }
        >
          Teknisi
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
