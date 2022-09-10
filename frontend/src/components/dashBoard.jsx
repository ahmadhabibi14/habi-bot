import React, { useState, useEffect } from "react";
import axios from "axios";
import TablePagination from "./tablePagination.jsx";

function Dashboard() {
  let [range,setRange] = useState([])

  function select(field,arrayOfteknisi) {
    arrayOfteknisi
      .filter(e => range(e.date).of(field))
  }

  //let datee = [];
  let i = 0;
  let [dataI, setDataI] = useState(0);
  const [date, setDate] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [filter, setFilter] = useState({});
  let Handles = [];
  let hideme = false;
  //Regional
  let [selectSektor, setSelectSektor] = useState("");
  let [selectRegional, setSelectRegional] = useState("");
  let [selectWitel, setSelectWitel] = useState("");
  let [regionalData, setRegional] = useState([]);
  let [witelData, setWitel] = useState([]);
  let [witelDataFull, setWitelFull] = useState([]);
  let [sektorData, setSektor] = useState([]);
  let [sektorFilt, setSektorFilt] = useState("");
  // Hooks
  let [Data, setData] = useState([]);
  // let [duplicateData, setDupData] = useState([]);
  // MODAL HOOK
  let RataRata = "-"
  let [rata_rata,set_rata_rata] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  let pickedUser = {};
  // MODAL
  const openModal = (data, Nama, NIK) => {
    setCurrentUser(data);
    setTaskList(data);
    setDateFilterValue("");
    setDateFunc(data);
    pickedUser = data;
    setName(Nama);
    setNik(NIK);
    //console.log(data)
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // Do Calc for rata rata 
  function getSumX(arr){
    let pointAll = 0
    for(let teknisi of arr){
      pointAll += teknisi.point 
    }
    return pointAll/arr.length
  }
  // FILTER
  function Submit() {
    console.log(sektorFilt);
    setSektor([]);
    setWitel([]);
    setRegional([]);
    setWitelFull([]);
    Regional();
    setSektorFilt([]);
    if (!sektorFilt || sektorFilt == "") {
      alert("tolong pilih sektor");
      return;
    }
    setFilter({ Sektor: sektorFilt });
    axios
      .post(
        `${server}leader/teknisi`,
        { to: 10, from: 0, filter: { Sektor: sektorFilt } },
        { withCredentials: true }
      )
      .then(async (e) => {
        setData(e.data);
        let sumx = getSumX(e.data) 
        set_rata_rata(sumx)
        setFilter();
        setDataDump(e.data.sort((a,e) => e.point - a.point))
        setDataI(1);
      });
  }
  function Witel() {
    axios
      .get(`${server}leader/witel`, { withCredentials: true })
      .then((res) => {
        setWitel(res.data);
      });
  }
  function Regional() {
    axios
      .get(`${server}leader/regional`, { withCredentials: true })
      .then((res) => {
        setRegional(res.data);
        //setWitel([])
        //setSektor([])
      });
  }
  // Update Witel
  function upWitel(a) {
    setSelectRegional(a);
    let regionalFrom = regionalData.find((e) => e.name == a);
    if (!regionalFrom) {
      setWitel([]);
      setSektor([]);
      return;
    }
    if (witelData) {
      setWitel([]);
    }
    setWitel(
      regionalFrom.witel.filter((e, i) => regionalFrom.witel.indexOf(e) === i)
    );
    setSektor([]);
    axios
      .get(`${server}leader/witel`, { withCredentials: true })
      .then((res) => {
        setWitelFull(res.data);
      });
  }
  function upSektor(a) {
    setSelectWitel(a);
    let witelFrom = witelDataFull.find((e) => e.name == a);
    if (!witelFrom) {
      return setSektor([]);
    }
    setSektor(
      witelFrom.sektor.filter((e, i) => witelFrom.sektor.indexOf(e) === i)
    );
  }
  // AKHIR MODAL

  let server = "";

  // AMBIL JSON dari external
  const fetchDataHome = async () => {
    let data = await axios.post(
      `${server}leader/teknisi`,
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
    setDataI(1);
    setDataDump(data)
    setData(data);
    return data;
  };

  const fetchData = async () => {
    let data = await axios.post(
      `${server}leader/teknisi`,
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
    //
    //console.log(sum(data))
    setDataI(0);
    setDataDump(data.sort((e,a) => a.point - e.point))
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

  // WORK HERE At 12.04

  // HOOK
  let [DataDump,setDataDump] = useState([])
  let [taskList, setTaskList] = useState([]);
  let [taskDate, setTaskDate] = useState([]);
  let [dateFilterValue, setDateFilterValue] = useState("");
  function doFilterByDate(date) {
    setDateFilterValue(date);
    //localStorage.setItem('currentUser-boundary982736',JSON.stringify(currentUser))
    let filtered = currentUser.filter((e) =>
      e.date.includes(date.slice(0, 10))
    );
    setTaskList(filtered);
  }
  function setDateFunc(TASK) {
    let arrWithoutDuplicate = [];
    let arrWithoutDateProp = [];
    TASK.forEach((e) => {
      if (arrWithoutDateProp.indexOf(e.date.slice(0, 10)) == -1) {
        arrWithoutDuplicate.push(e.date);
        arrWithoutDateProp.push(e.date.slice(0, 10));
      }
    });
    //console.log(arrWithoutDuplicate);
    setTaskDate(arrWithoutDuplicate);
  }
  function convertToInt(date) {
    //console.log(Date.parse(date.slice(0, 10)), date.slice(0, 10));
    return Date.parse(date.slice(0, 10));
  }
  function isValid(startDate, endDate, taskDate) {
    return  (
      convertToInt(startDateInt) < convertToInt(taskDate) &&
      convertToInt(endDateInt) > convertToInt(taskDate)
    );

  }
  function sumPoint(...points){
    let po = 0
    for(let i of points){
      console.log(i,  typeof i)
      po += i
    }
    return po
  }
  // HOOK for Date
  let [startDateInt, setStartDateInt] = useState("");
  let [endDateInt, setEndDateInt] = useState("");
  function doAFilterWithDate(v, ind) {
    let newData = Data.map(e => {
      let currentUsers = {...e}
      let hasFilter = currentUsers.Handle.filter((e) => {
        //console.log(startDateInt, endDateInt, e.date);
        return isValid(startDateInt, endDateInt, e.date)
      });
      console.log(hasFilter);
      currentUsers.Handle = hasFilter
      let points = hasFilter.map(e => e.point)
      currentUsers.point = sumPoint(...points)
      return currentUsers
      //console.log(currentUser)
    })
    //fetchData()
    console.log(newData)
    setDataDump(newData.sort((a,e)=> e.point - a.point))
    //console.log(Data)
  }
  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* INI NTAR MODAL nya, njirrr aku bingung */}
      {isOpen && (
        <>
          <div className="flex flex-col absolute bg-slate-100 w-fit border-2 rounded-lg border-slate-700 fixed top-1/2 left-1/2 min-wh-80 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-slate-400">
            <div className="flex flex-row justify-end border-b border-slate-700">
              <button
                className="text-gray-200 hover:bg-red-400 bg-red-500 hover:scale-100 p-2"
                onClick={closeModal}
                title="Close"
              >
                <img src="/images/x.svg" width="10" />
              </button>
            </div>

            <div className="p-4 flex flex-col space-y-2">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row space-x-2">
                  <span className="px-6 py-2 bg-slate-800 text-slate-50 rounded-lg">
                    {" "}
                    NAMA : {name}{" "}
                  </span>
                  <span className="px-6 py-2 bg-slate-800 text-slate-50 rounded-lg">
                    {" "}
                    NIK : {nik}{" "}
                  </span>
                  {/* Intervall Date */}
                </div>
                <span className="px-6 py-2 bg-slate-800 text-slate-50 rounded-lg">
                  TUGAS
                </span>
              </div>

              <div className="overflow-y-scroll h-80">
                <table className="w-full h-full bg-slate-90border border-slate-900 mx-auto">
                  {/* Ket. Tabel */}
                  <thead>
                    <tr className="bg-slate-800">
                      {[
                        ["Jenis"],
                        ["Status"],
                        ["Date"],
                        //["Keluhan"],
                        //["Perbaikan"],
                      ].map(([isiData]) => (
                        <td className="text-slate-50 px-2 py-1 border border-slate-700">
                          {isiData}
                        </td>
                      ))}
                    </tr>
                  </thead>
                  {/* AKhir head tabel */}

                  {/* Isi Tabel */}
                  {/* OVERFLOW INI ARTINYA NANTI BAKAL SCROLL OTOMATIS */}
                  <tbody>
                    {taskList.length == 0 && <span>Nothing to show</span>}
                    {taskList.map((user) => {
                      return (
                        <tr>
                          <td className="px-2 py-1 border border-slate-900">
                            {user.type}
                          </td>
                          <td className="px-2 py-1 border border-slate-900">
                            {user.done ? "sudah" : "belum"}
                          </td>
                          <td className="px-2 py-1 border border-slate-900">
                            Pada {user.date.slice(0, 10)} Pukul{" "}
                            {user.date.split("T")[1].slice(0, 8)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {/* Akhir Isi Tabel */}
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      {/* AKHIR MODAL */}

      {/* Header Dashboard */}
      <div className="flex justify-around">
        <h2 className="text-2xl font-bold">TABEL</h2>

        {/*DISINI FILTER TANGGAL NYA : IYA BI AKU UDAH LIAT*/}
        {/*FILTER TANGGAL*/}
        <div className="flex flex-row space-x-1.5">
          <div className="px-6 py-2 bg-slate-800 text-slate-50 rounded-lg">
            <span className="mr-4"> Start </span>
            <input 
              onChange={e => setStartDateInt(e.target.value)}
              max={endDateInt}
              className="px-2 text-gray-900 rounded" type="date" 
            />
          </div>

          <div className="px-6 py-2 bg-slate-800 text-slate-50 rounded-lg">
            <span className="mr-4"> End </span>
            <input min={startDateInt} onChange={e => setEndDateInt(e.target.value)} type="date" className="px-2 text-gray-900 rounded" />
          </div>
          <button onClick={e => doAFilterWithDate()} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-300 text-slate-50 rounded-lg">
            {" "}
            
            Submit{" "}
          </button>
        </div>
        {/*AKHIR FILTER FUCKING TANGGAL*/}
      </div>

      <div className="flex flex-row items-end">
        {/* REGIONAL*/}
        <div className="flex flex-col space-y-2 justify-center">
          <label className="ml-2 text-lg font-bold">Regional</label>

          <select
            onChange={(e) => upWitel(e.target.value)}
            value={selectRegional}
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
            value={selectWitel}
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
              DataDump.map((e) => {
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
                      {e.Handle.filter((e) => e.type == "tiketRegular").length * 1 }
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "LaporLangsung").length * 1}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "TiketSQM").length * 0.5}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "Proman").length * 0.5}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "TutupODP").length * 0.25}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "Valins").length * 0.25}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "Unspect").length * 0.7}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "gamasTipeA").length * 2}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "gamasTipeB").length * 3}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "gamasTipeC").length * 4}
                    </td>
                    <td className="border border-slate-900 text-slate-900 px-2 py-1 cursor-pointer hover:bg-slate-400">
                      {e.Handle.filter((e) => e.type == "nub").length * -2}
                    </td>
                  </tr>
                );
              })
            }
          </thead>
          {/* AKhir head tabel */}
        </table>
      </div>

      <div className="flex">
        <span className="py-1 px-3 border-2 border-slate-900 rounded-lg">
          RATA - RATA : {rata_rata}
        </span>
      </div>

      {/* NTAR disini mungkin tambahin atribut atau apa, yang pasti ini function,
    trus atribut nya pake parameter..... 😨️*/}
      <TablePagination
        Data={Data}
        DataDump={DataDump}
        setDataDump={setDataDump}
        i={dataI}
        setData={setData}
        filter={filter}
      />
    </div>
  );
}

export default Dashboard;
