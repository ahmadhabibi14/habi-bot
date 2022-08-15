import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  // Hooks
  const [data, setData] = useState([]);

  // AMBIL JSON dari external
  const fetchData = () => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((json) => {
      // console.log(json.data);
      setData(json.data);
    });
  };

  // Ini biar TABEL nya jalan otomatis saat web di load
  useEffect(() => {
    let ignore = false;

    if (!ignore) fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {/* Input Tanggal */}
      <div className="flex flex-row space-x-4 justify-end">
        <select
          name="Dates"
          id="SelectDates"
          className="py-2 px-4 bg-inherit border-2 border-slate-900 rounded-none"
        >
          <option value="">JAN 21</option>
          <option value="FEB 18">FEB 18</option>
          <option value="JUL 05">JUL 05</option>
        </select>

        <button className="py-2 px-4 border-2 border-slate-900">Filter</button>
      </div>
      {/* END */}

      {/* Title */}
      <h2 className="text-2xl font-bold ml-24">TABEL</h2>

      {/* Tempat Tabel data-data dari teknisi nya */}
      <div className="w-full">
        <table className="w-full border-2 border-slate-900 mx-auto">
          {/* Ket. Tabel */}
          <thead>
            <tr>
              {[["Name"], ["Email"], ["Address"], ["Company"]].map(
                ([isiData]) => (
                  <td className="bg-slate-900 text-slate-50">{isiData}</td>
                )
              )}
            </tr>
          </thead>
          {/* AKhir head tabel */}

          {/* Isi Tabel */}
          <tbody>
            {data.map((user) => {
              return (
                <tr>
                  <td className="border border-slate-900">{user.name}</td>
                  <td className="border border-slate-900">{user.email}</td>
                  <td className="border border-slate-900">
                    {user.address.street}
                  </td>
                  <td className="border border-slate-900">
                    {user.company.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* Akhir Isi Tabel */}
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
