import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  // Hooks
  const [data, setData] = useState([]);

  let server = "http://localhost:8887";

  // AMBIL JSON dari external
  const fetchData = () => {
    axios
      .get(`${server}/leader/teknisi`)
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
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
      <div className="flex flex-row space-x-6 justify-end">
        <select
          name="Dates"
          id="SelectDates"
          className="py-2 px-3 bg-inherit border-2 border-slate-900 rounded-lg"
        >
          <option value="">JAN 21</option>
          <option value="FEB 18">FEB 18</option>
          <option value="JUL 05">JUL 05</option>
        </select>

        <button className="py-1.5 px-4 rounded-lg hover:bg-transparent hover:text-slate-900 border-2 border-slate-900 bg-slate-900 text-slate-50">
          Filter
        </button>
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
                  <td className="bg-slate-900 text-slate-50 px-2 py-1">
                    {isiData}
                  </td>
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
                  <td className="px-2 py-1 border border-slate-900">
                    {user.name}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.email}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.address.street}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
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
