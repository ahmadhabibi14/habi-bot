import React, { useEffect, useState } from "react";
import axios from "axios";

function TlBoard() {
  let server = "http://localhost:8887/";
  let data = "";
  let [user, setUser] = useState([]);
  let [userOld, setUserOld ] = useState([])
  let [type, setType] = useState();
  let [namaTeknisi, setNamaTeknisi] = useState();
  let [ket, setKeterangan] = useState();

  // INI HOOK NGEH 
  let [selectReginal, setSelectRegional] = useState("")
  let [selectWitel, setSelectWitel] = useState("")
  let [selectSektor, setSelectSektor] = useState("")

  let idGen = "";
  if (!localStorage.getItem("Lxpx")) {
    window.location.href = "/login";
  }
  data = JSON.parse(localStorage.getItem("Lxpx"));
  async function getUsers() {
    let getData = await fetch(server + "leader/teknisi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      credentials: "include",
    });
    setUser(await getData.json());
    setUserOld(user)
    //console.log(user)
  }
  useEffect(() => {
    getUsers();
    getRegional();
  }, []);
  let NameTeknisi = user.map((e) => {
    return e.Nama;
  });
  let TeknisiNik = user.map((e) => {
    return e.NIK + " " + e.Nama;
  });
  function setNamaTeknisiHandle(e){ 
    setNamaTeknisi(e)
    getUsers()
    setWitel([])
    setRegional([])
    setWitelFull([])
    setSektor([])
    getRegional()
  }
  async function submit() {
    //console.log(type, namaTeknisi, ket);
    await fetch("http://localhost:8887/leader/addtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        idGenerate: "",
        namaTeknisi: namaTeknisi,
        keterangan: ket,
        Nik: namaTeknisi,
        type: type,
      }),
    });
    alert("tugas dikirim ke teknisi");
  }
  async function recover(){
    await getUsers()
  }
  async function filter(sektor){
    setSelectSektor(sektor)
    if(!sektor){
      return 
    }
    let filtered = user.filter(e => e.Sektor == sektor)
    setUser(filtered)
      
  }

  // HOOK NIKI NGIH
  let [Regional, setRegional] = useState([])
  let [Witel, setWitel] = useState([])
  let [witelFull,setWitelFull] = useState([])
  let [Sektor, setSektor] = useState([])

  //Function Handler

  function updateSektor(a){
    setSelectWitel(a)
    getUsers()
    // console.log(a + "/sd")
    let sektor = witelFull.find(e => e.name == a)
    if(!sektor){
      setSektor([])
      return 
    }
    setSektor(sektor.sektor)
  }
  function updateWitel(a){
    setSelectRegional(a)
    setSektor([])
    alert(a)
    let witel = Regional.find(e => e.name == a )
    // console.log(witel)
    if(!witel){
      setWitel([])
      setSektor([])
      return 
    }
    setWitel(witel.witel)
    axios
      .get("http://localhost:8887"+"/leader/witel",{withCredentials: true})
      .then(e => setWitelFull(e.data))
      .catch(e => console.log(e))
  }
  function getRegional(){
    setSelectWitel('')
    axios
      .get("http://localhost:8887"+'/leader/regional',{
        withCredentials: true
      })
      .then(e => {
        setRegional(e.data)
      })
      .catch(e => {
        console.log(e)
      })

  }
  return (
    <div className="flex flex-col space-y-4">
      {/* Info PRofil Leader */}
      <div className="flex flex-row space-x-4 justify-end items-center">
        <p className="text-lg">Selamat Datang, {data.Nama}</p>
        <img src="/images/profile.svg" width="45" />
      </div>
      {/* END */}

      {/* Title */}
      <h2 className="text-2xl font-bold ml-24">TL BOARD</h2>

      {/* Tempat Tabel data-data dari teknisi nya */}
      <div className="min-w-8/12 border-2 border-slate-900 flex flex-col w-10/12 ml-10">
        <h3 className="text-slate-50 bg-slate-900 px-4 py-2">
          Input Performansi
        </h3>

        <div className="flex flex-col p-8 space-y-3.5">
          {/*// NIK / Nama Teknisi*/}
          <div className="flex flex-row justify-between items-center content-center">
            <label>NIK / Nama Teknisi</label>

            <div className="flex flex-row w-fit">
              {/* PILIH REGIONAL */}
              <div className="flex flex-col ml-2">
                <label className="font-bold px-2 py-1.5">Pilih Regional</label>
                <select
                  name="nama_teknisi"
                  onChange={e => updateWitel(e.target.value)}
                  className="py-1 px-2 bg-inherit border-2 border-slate-900 rounded-lg focus:rounded-lg"
                >
                  { Regional.length != 0 && 
                    <option selected value="">Pilih Regional</option>
                  }
                  { Regional.length == 0 && 
                    <option selected value="">Pilih Regional</option>
                  }
                  { 
                    Regional.length >= 0 && Regional.map(e => {
                      console.log(e.name)
                      return <option value={e.name}>{e.name}</option>
                    })
                  }
                </select>
              </div>

              {/* PILIH Witel */}
              <div className="flex flex-col ml-2">
                <label className="font-bold px-2 py-1.5">Pilih Witel</label>
                <select
                  name="nama_teknisi"
                  value={selectWitel}
                  onChange={e => updateSektor(e.target.value)}
                  className="py-1 px-2 bg-inherit border-2 border-slate-900 rounded-lg focus:rounded-lg"
                >
                  { Witel.length != 0 && 
                    <option selected value="">Pilih Witel</option>
                  }
                  { Witel.length == 0 && 
                    <option selected value="">Pilih Witel</option>
                  }
                  { Witel.length >= 0 && Witel.map(e => {
                    return <option value={e}>{e}</option>
                  })}
                </select>
              </div>

              {/* PILIH Sektor */}
              <div className="flex flex-col ml-2">
                <label className="font-bold px-2 py-1.5">Pilih Sektor</label>
                <select
                  name="nama_teknisi"
                  value={selectSektor}
                  onChange={e => filter(e.target.value)}
                  className="py-1 px-2 bg-inherit border-2 border-slate-900 rounded-lg focus:rounded-lg"
                >
                  { Sektor.length != 0 && 
                    <option selected value="">Pilih Sektor</option>
                  }
                  { Sektor.length == 0 && 
                    <option selected value="">Pilih Sektor</option>
                  }
                  {
                    Sektor.length >= 0 && Sektor.map(e => {
                      return <option value={e}>{e}</option>
                    })
                  }
                </select>
              </div>

              {/* NAMA TEKNISI */}
              <div className="flex flex-col ml-2">
                <label className="font-bold px-2 py-1.5">Nama Teknisi</label>
                <select
                  onChange={(e) => setNamaTeknisiHandle(e.target.value)}
                  name="nama_teknisi"
                  className="py-1 px-2 bg-inherit border-2 border-slate-900 rounded-lg focus:rounded-lg"
                >
                  {user.length != 0 && <option value="">Pilih Teknisi</option>}
                  {user.map((e) => {
                    return (
                      <option key={e.NIK} value={e.NIK}>
                        {e.NIK + " " + e.Nama}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <hr />

          {/*// Jenis Tugas*/}
          <div className="flex flex-row justify-between items-start">
            <label>Jenis Tugas</label>
            <select
              name="jenis_tugas"
              onChange={(e) => setType(e.target.value)}
              className="py-1 px-2 bg-inherit border-2 border-slate-900 rounded-lg focus:rounded-lg"
            >
              <option value="">Pilih Jenis Tugas</option>
              <option value="gamasTipeA">Gamas Tipe A</option>
              <option value="gamasTipeB">Gamas Tipe B</option>
              <option value="gamasTipeC">Gamas Tipe C</option>
              <option value="tugasTl">Tugas TL</option>
            </select>
          </div>

          <hr />

          {/*// Keterangan*/}
          <div className="flex flex-row justify-between items-start">
            <label>Keterangan</label>
            <textarea
              cols="30"
              rows="3"
              placeholder="Keterangan"
              onChange={(e) => setKeterangan(e.target.value)}
              className="p-2 focus:ring-2 ring-2 border-1 border-slate-900 outline-2 outline-slate-800 ring-2 ring-slate-900 rounded-md"
              name="keterangan"
              id="keterangan"
            ></textarea>
          </div>

          {/* BUTTON Submit*/}
          <div className="flex flex-row justify-end">
            <button
              type="button"
              value="Submit"
              onClick={(e) => submit()}
              className="py-1.5 px-3 text-slate-50 rounded-lg bg-emerald-500 hover:bg-emerald-400"
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TlBoard;
