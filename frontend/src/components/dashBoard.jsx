import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  let datee = [];
  const [date, setDate] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  let Handles = [];
  // Hooks
  const [Data, setData] = useState([]);
  // MODAL HOOK
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  // MODAL
  const openModal = (data, Nama, NIK) => {
    setCurrentUser(data);
    setName(Nama);
    setNik(NIK);
    //console.log(data)
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // FILTER
  function Sektor() {
    axios
      .get(`${server}/leader/sektor`, { withCredentials: true })
      .then((e) => {
        console.log(e.data);
      });
  }
  function Witel() {
    axios.get(`${server}/leader/witel`, { withCredentials: true }).then((e) => {
      console.log(e.data);
    });
  }
  function Regional() {
    axios
      .get(`${server}/leader/regional`, { withCredentials: true })
      .then((e) => {
        console.log(e.data);
      });
  }

  // AKHIR MODAL

  let server = "http://localhost:8887";

  // AMBIL JSON dari external
  const fetchData = () => {
    axios
      .post(
        `${server}/leader/teknisi`,
        {
          to: 10,
          from: 0,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  //console.log(datee)
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
          <div className="flex flex-col bg-slate-900 fixed w-fit border border-slate-900">
            <div className="flex flex-row justify-end border border-slate-900">
              <button onClick={closeModal} className="p-2">
                X
              </button>
            </div>
            <div className="p-2">
              <table className="w-full bg-slate-900 text-slate-50 border border-slate-900 mx-auto">
                {/* Ket. Tabel */}
                <thead>
                  <p> Nama : {name} </p>
                  <p> Nik : {nik} </p>
                  <p> Tugas : </p>
                  <tr>
                    {[
                      ["Jenis"],
                      ["Status"],
                      ["Date"],
                      //["Keluhan"],
                      //["Perbaikan"],
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
                  {currentUser.map((user) => {
                    return (
                      <tr>
                        <td className="px-2 py-1 bg-green-800 text-gray-50 border border-slate-900">
                          {user.type}
                        </td>
                        <td className="px-2 py-1 bg-green-800 text-gray-50 border border-slate-900">
                          {user.done ? "sudah" : "belum"}
                        </td>
                        <td className="px-2 py-1  bg-green-800 text-gray-50 border border-slate-900">
                          {user.date}
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

      {/* Input Tanggal 
      <div className="flex flex-row space-x-6 justify-end">
        <select
          name="Dates"
          id="SelectDates"
          className="py-2 px-3 bg-inherit border-2 border-slate-900 rounded-lg"
        >
        {
          date.map((e)=> {
            return <option value={e} onChange={e => setData(Data.filter(a => a.includes ))}>{e != undefined? e.slice(0,10) : "selasa"}</option>
          })
        }
        </select> }

    {//<button className="py-1.5 px-4 rounded-lg hover:bg-transparent hover:text-slate-900 border-2 border-slate-900 bg-slate-900 text-slate-50">Filter</button>
    }
      </div>
      {/* END */}

      {/* Title */}
      <h2 className="text-2xl font-bold ml-24">TABEL</h2>
      <div className="mr-8">
        <button
          onClick={() => Sektor()}
          className="mr-8 py-1.5 px-4 rounded-lg hover:bg-transparent hover:text-slate-900 border-2 border-slate-900 bg-slate-900 text-slate-50"
        >
          Sektor
        </button>
        <button
          onClick={() => Witel()}
          className="mr-8 py-1.5 px-4 rounded-lg hover:bg-transparent hover:text-slate-900 border-2 border-slate-900 bg-slate-900 text-slate-50"
        >
          Witel
        </button>
        <button
          onClick={() => Regional()}
          className="mr-8 py-1.5 px-4 rounded-lg hover:bg-transparent hover:text-slate-900 border-2 border-slate-900 bg-slate-900 text-slate-50"
        >
          Regional
        </button>
      </div>

      {/* Tempat Tabel data-data dari teknisi nya */}
      <div className="w-full">
        <table className="w-full border-2 border-slate-900 mx-auto">
          {/* Ket. Tabel */}
          <thead>
            <tr>
              {[
                "NIK",
                "Nama",
                "Point",
                "T1",
                "T2",
                "T3",
                "T4",
                "T5",
                "T6",
                "T7",
                "T8",
                "T9",
                "T10",
                "T11",
                "T12",
              ].map((isiData) => {
                return (
                  <td className="bg-slate-900 text-slate-50 px-2 py-1">
                    {isiData}
                  </td>
                );
              })}
            </tr>
            {
              //{/*USER MAPPED*/}
              Data.map((e) => {
                return (
                  <tr onClick={() => openModal(e.Handle, e.Nama, e.NIK)}>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.NIK}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Nama}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.point}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "tiketRegular").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "LaporLangsung").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "TiketSQM").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "Proman").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "TutupODP").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "Valins").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "Unspect").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "gamasTipeA").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "gamasTipeB").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "gamasTipeC").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "survey").length}
                    </td>
                    <td className="bg-slate-900 text-slate-50 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "lapul").length}
                    </td>
                  </tr>
                );
              })
            }
          </thead>
          {/* AKhir head tabel */}

          {/* Isi Tabel */}
          <tbody>
            {/* {data.map((user) => {
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
          */}
          </tbody>
          {/* Akhir Isi Tabel */}
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
