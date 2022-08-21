import React, { useState, useEffect } from "react";
import axios from "axios";
import TablePagination from "./tablePagination.jsx";

function Dashboard() {
  let datee = [];
  const [date, setDate] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  let Handles = [];
  // Hooks
  let [Data, setData] = useState([]);
  let [duplicateData, setDupData] = useState([])
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
      .then(async(e) => {
        let sortSek = e.data;
        sortSek = sortSek.sort((a,b) => {
          return a.rata_rata - b.rata_rata
        })
        let Da = []
        await fetchData()
        //setData(dad)
        //setData(duplicateData)
        sortSek.forEach((e)=>{
          let Filter = Data.filter((a)=> a.Sektor == e.name);
          Da = [...Filter,...Da]
        })
        console.log(Data)
        setData(Da)
        console.log(sortSek)
      });
  }
  function Witel() {
   axios
      .get(`${server}/leader/witel`, { withCredentials: true })
      .then(async (e) => {
        let sortSek = e.data;
        sortSek = sortSek.sort((a,b) => {
          return a.rata_rata - b.rata_rata
        })
        let Da = []
        await fetchData()
        sortSek.forEach((e)=>{
          let Filter = Data.filter((a)=> a.Witel == e.name);
          Da = [...Filter,...Da]
        })
        setData(Da)
      });
  }
  function Regional() {
   axios
      .get(`${server}/leader/regional`, { withCredentials: true })
      .then(async(e) => {
        let sortSek = e.data;
        sortSek = sortSek.sort((a,b) => {
          return a.rata_rata - b.rata_rata
        })
        let Da = []
        await fetchData()
        //if(duplicateData){
          //setData(duplicateData)
        //}
        //setData(duplicateData)
        sortSek.forEach((e)=>{
          let Filter = Data.filter((a)=> a.Regional == e.name);
          Da = [...Filter,...Da]
        })
        setData(Da)

      });
  }

  

  // AKHIR MODAL

  let server = "http://localhost:8887";

  // AMBIL JSON dari external
  const fetchData = async() => {
    let data = await axios
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
    data = data.data
    console.log(data)
    setData(data)
    return data
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
          <div className="flex flex-col w-full bg-slate-900 fixed w-fit border border-slate-900">
            <div className="flex flex-row justify-end border border-slate-900">
              <button className="text-gray-200" onClick={closeModal} className="p-2">
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
                <tbody className="overflow-y-auto">
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
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.NIK}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Nama}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.point}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "tiketRegular").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "LaporLangsung").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "TiketSQM").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "Proman").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "TutupODP").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "Valins").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "Unspect").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "gamasTipeA").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "gamasTipeB").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "gamasTipeC").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
                      {e.Handle.filter((e) => e.type == "survey").length}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1">
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
      <TablePagination Data={Data} setData={setData}/>
    </div>
  );
}

export default Dashboard;
