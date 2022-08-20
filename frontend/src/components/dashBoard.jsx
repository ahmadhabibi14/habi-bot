import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  // Hooks
  const [data, setData] = useState([]);
  // MODAL HOOK
  const [isOpen, setIsOpen] = useState(false);

  // MODAL
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // AKHIR MODAL

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
      {/* INI NTAR MODAL nya, njirrr aku bingung */}
      {isOpen && (
        <>
          <div className="flex flex-col fixed w-fit border border-slate-900">
            <div className="flex flex-row justify-end border border-slate-900">
              <button onClick={closeModal} className="p-2">
                X
              </button>
            </div>
            <div className="p-2">
              <table className="w-full border border-slate-900 mx-auto">
                {/* Ket. Tabel */}
                <thead>
                  <tr>
                    {[
                      ["ID Order"],
                      ["NIK"],
                      ["Nama"],
                      ["No Tiket"],
                      ["No Speedy"],
                      ["Keluhan"],
                      ["Perbaikan"],
                    ].map(([isiData]) => (
                      <td className="bg-slate-900 text-slate-50 px-2 py-1">
                        {isiData}
                      </td>
                    ))}
                  </tr>
                </thead>
                {/* AKhir head tabel */}

                {/* Isi Tabel */}
                <tbody>
                  {data.map((user) => {
                    return (
                      <tr>
                        <td className="px-2 py-1 border border-slate-900">
                          {user.idOrder}
                        </td>
                        <td className="px-2 py-1 border border-slate-900">
                          {user.nik}
                        </td>
                        <td className="px-2 py-1 border border-slate-900">
                          {user.nama}
                        </td>
                        <td className="px-2 py-1 border border-slate-900">
                          {user.noTiket}
                        </td>
                        <td className="px-2 py-1 border border-slate-900">
                          {user.noSpeedy}
                        </td>
                        <td className="px-2 py-1 border border-slate-900">
                          {user.keluhan}
                        </td>
                        <td className="px-2 py-1 border border-slate-900">
                          {user.perbaikan}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* Akhir Isi Tabel */}
              </table>
            </div>
          </div>
        </>
      )}
      {/* AKHIR MODAL */}

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
              {[
                ["NIK"],
                ["Nama"],
                ["T1"],
                ["T2"],
                ["T3"],
                ["T4"],
                ["T5"],
                ["T6"],
                ["T7"],
                ["T8"],
                ["T9"],
                ["T10"],
                ["T11"],
                ["T12"],
              ].map(([isiData]) => (
                <td className="bg-slate-900 text-slate-50 px-2 py-1">
                  {isiData}
                </td>
              ))}
            </tr>
          </thead>
          {/* AKhir head tabel */}

          {/* Isi Tabel */}
          <tbody>
            {data.map((user) => {
              return (
                <tr>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.nik}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.nama}
                  </td>
                  // NTAR tiap t1 sampe t2 tambahin onclick kalo di tekan
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t1}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t2}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t3}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t4}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t5}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t6}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t7}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t8}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t9}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t10}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t11}
                  </td>
                  <td className="px-2 py-1 border border-slate-900">
                    {user.t12}
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
