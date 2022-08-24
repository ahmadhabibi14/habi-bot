import React, { useState, useEffect } from "react";
import axios from "axios";
import TablePagination from "./tablePagination.jsx";

function Dashboard() {
  //let datee = [];
  let i = 0;
  const [date, setDate] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [filter, setFilter] = useState({});
  let Handles = [];
  let hideme = false;
  //Regional
  let [regionalData, setRegional] = useState([]);
  let [witelData, setWitel] = useState([]);
  let [witelDataFull, setWitelFull] = useState([]);
  let [sektorData, setSektor] = useState([]);
  let [sektorFilt, setSektorFilt] = useState("");
  // Hooks
  let [Data, setData] = useState([]);
  //let [duplicateData, setDupData] = useState([]);
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
  function Submit() {
    console.log(sektorFilt);
    if (!sektorFilt) {
      axios
        .post(
          `${server}/leader/teknisi`,
          { to: 10, from: 0, filter: {} },
          { withCredentials: true }
        )
        .then((e) => {
          setData(e.data);
        });
      return;
    }
    setFilter({ Sektor: sektorFilt });
    axios
      .post(
        `${server}/leader/teknisi`,
        { to: 10, from: 0, filter: { Sektor: sektorFilt } },
        { withCredentials: true }
      )
      .then(async (e) => {
        setData(e.data);
        setFilter();
      });
  }
  function Witel() {
    axios
      .get(`${server}/leader/witel`, { withCredentials: true })
      .then((res) => {
        setWitel(res.data);
      });
  }
  function Regional() {
    axios
      .get(`${server}/leader/regional`, { withCredentials: true })
      .then((res) => {
        setRegional(res.data);
      });
  }
  // Update Witel
  function upWitel(a) {
    let regionalFrom = regionalData.find((e) => e.name == a);
    if (!regionalFrom) {
      setWitel([]);
      setSektor([]);
      return;
    }
    setWitel(regionalFrom.witel);
    setSektor([]);
    axios
      .get(`${server}/leader/witel`, { withCredentials: true })
      .then((res) => {
        setWitelFull(res.data);
      });
  }
  function upSektor(a) {
    let witelFrom = witelDataFull.find((e) => e.name == a);
    if (!witelFrom) {
      return setSektor([]);
    }
    setSektor(witelFrom.sektor);
  }
  // AKHIR MODAL

  let server = "http://localhost:8887";

  // AMBIL JSON dari external
  const fetchData = async () => {
    let data = await axios.post(
      `${server}/leader/teknisi`,
      {
        to: 10,
        from: 0,
      },
      {
        withCredentials: true,
      }
    );
    data = data.data;
    // console.log(data);
    setData(data);
    return data;
  };
  //console.log(datee)
  // Ini biar TABEL nya jalan otomatis saat web di load
  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetchData();
      Regional();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* INI NTAR MODAL nya, njirrr aku bingung */}
      {isOpen && (
        <>
          <div className="flex flex-col absolute bg-slate-900 fixed w-fit border border-slate-900">
            <div className="flex flex-row justify-end border border-slate-900">
              <button
                className="text-gray-200 hover:bg-green-700 hover:scale-100"
                onClick={closeModal}
                className="text-slate-50 p-2"
              >
                X
              </button>
            </div>
            <div className="p-2">
              <table className="w-full h-full bg-slate-90 text-slate-50 border border-slate-900 mx-auto">
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
                {/* OVERFLOW INI ARTINYA NANTI BAKAL SCROLL OTOMATIS */}
                <tbody className="overflow-auto overflow-visible h-90">
                  {currentUser.map((user) => {
                    return (
                      <tr className="">
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

      <div className="flex flex-row items-end">
        {/* REGIONAL*/}
        <div className="flex flex-col space-y-2 justify-center">
          <label className="ml-2 text-lg font-bold">Regional</label>

          <select
            onChange={(e) => upWitel(e.target.value)}
            //value="tidak ada regional di pilih"
            className="py-1 px-2 bg-inherit border-2 mr-4 w-48 border-slate-900 rounded-lg focus:rounded-lg"
          >
            <option selected value="">
              Pilih regional
            </option>
            }
            {regionalData.map((e) => {
              //first = false
              return <option value={e.name}>{e.name}</option>;
            })}
          </select>
        </div>

        {/* WITEL*/}
        <div className="flex flex-col space-y-2 justify-center">
          <label className="ml-2 text-lg font-bold">Witel</label>

          <select
            onChange={(e) => upSektor(e.target.value)}
            className="py-1 px-2 bg-inherit border-2 mr-4 w-48 border-slate-900 rounded-lg focus:rounded-lg"
          >
            {witelData.length != 0 && (
              <option selected value="">
                Pilih witel
              </option>
            )}
            {witelData.length == 0 && (
              <option>Pilih nama regional terlebih dahulu</option>
            )}
            {witelData.map((e) => {
              return <option value={e}> {e} </option>;
            })}
          </select>
        </div>

        {/* SEKTOR*/}
        <div className="flex flex-col space-y-2 justify-center">
          <label className="ml-2 text-lg font-bold">Sektor</label>

          <select
            onChange={(e) => setSektorFilt(e.target.value)}
            className="py-1 px-2 bg-inherit border-2 mr-4 w-48 border-slate-900 rounded-lg focus:rounded-lg"
          >
            {sektorData.length != 0 && (
              <option selected value="">
                Pilih sektor
              </option>
            )}
            {sektorData.length == 0 && (
              <option selected value="">
                Pilih witel terlebih dahulu
              </option>
            )}
            {sektorData.map((e) => {
              return <option value={e}>{e}</option>;
            })}
          </select>
        </div>

        <div className="flex flex-row space-x-4">
          {/* SUBMIT */}
          <button
            className="mr-4 py-1.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-300 text-slate-50 font-bold border-2 border-emerald-500 hover:border-emerald-300"
            title="SUBMIT"
            onClick={() => Submit()}
          >
            SUBMIT
          </button>
          <button
            className="mr-8 py-1.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-300 text-slate-50 font-bold border-2 border-emerald-500 hover:border-emerald-300"
            title="SUBMIT"
            onClick={() => fetchData()}
          >
            Home
          </button>
        </div>
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
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.NIK}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Nama}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.point}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "tiketRegular").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "LaporLangsung").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "TiketSQM").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "Proman").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "TutupODP").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "Valins").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "Unspect").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "gamasTipeA").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "gamasTipeB").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "gamasTipeC").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "survey").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "lapul").length}
                    </td>
                  </tr>
                );
              })
            }
          </thead>
          {/* AKhir head tabel */}
        </table>
      </div>

      {/* NTAR disini mungkin tambahin atribut atau apa, yang pasti ini function,
    trus atribut nya pake parameter..... 😨️*/}
      <TablePagination Data={Data} setData={setData} filter={filter} />
    </div>
  );
}

export default Dashboard;
