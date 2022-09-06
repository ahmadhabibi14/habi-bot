import React, { useState,useEffect } from "react";
import axios from "axios";

function AddTeknisi() {
  let server = ""
  let newTeknisi = {
    NIK: 0,
    Nama: "",
    IDTelegram: "",
    NamaMitra: "",
    Sektor: "",
    Witel: "",
    Regional: "",
    Handle: [],
    point: 0,
  };
  // HOOK
  const [nik, setNik] = useState(0);
  const [nama, setNama] = useState(0);
  const [idTelegram, setIdTelegram] = useState(0);
  const [namaMitra, setNamaMitra] = useState(0);
  const [sektor, setSektor] = useState(0);
  const [witel, setWitel] = useState(0);
  const [regional, setRegional] = useState(0);

  function Daftar() {
    newTeknisi.NIK = nik;
    newTeknisi.Nama = nama;
    newTeknisi.IDTelegram = idTelegram;
    newTeknisi.NamaMitra = namaMitra;
    newTeknisi.Sektor = sektor;
    newTeknisi.Witel = witel;
    newTeknisi.Regional = regional;
    axios
      .post(server + "/leader/create/teknisi", newTeknisi, {
        withCredentials: true,
      })
      .then((r) => {
        console.log(r);
        alert("teknisi ditambahkan");
        window.location.reload();
      })
      .catch((res) => {
        alert("nik sudah ada tidak bisa menambahkan");
        window.location.reload();
      });
  }
  // DELETE TEKNISI HANDLE
  
  // FIRST IS HOOK
  // varname + D mean these varname for Data hook && V mean value
  let [witelV,setWitelV] = useState('')
  let [sektorV,setSektorV] = useState('')
  let [ sektorD, setSektorD ] =  useState([])
  let [ witelD, setWitelD ] = useState([])
  let [ regionalD, setRegionalD ] = useState([])
  let [ userD, setUserD] = useState([])
  let [ filter, setFilter] = useState('')
  let [ teknisiNik, setTeknisiNik] = useState('')
  // HOOK IF NEED FETCH TO BACKEND 
  // varname + F + D mean these varname for fetch Data
  let [ regionalFD, setRegionalFD] = useState([])
  let [ witelFD, setWitelFD] = useState([])
  let [ users, setUser ] = useState([])
  function skip(){
    alert("continue ? ")
  }
  // function in here 
  async function getRegional(){
    axios.get(server+'/leader/regional',{withCredentials: true})
      .then((e)=>{
        //console.log(e)
        setRegionalFD(e.data)
      }).catch(e => {
        skip()
      })
  }
  // Update Handle From Handle Select
  function removeTeknisi(){
    if(!teknisiNik){
      return alert('pilih teknisi terlebih dahulu')
    }
    // Progess
    ///alert(teknisiNik)
    axios
      .get(server+'/leader/delete/teknisi/'+teknisiNik,{withCredentials: true})
      .then(e => {
        alert("sukses menghapus teknisi")
        window.location.reload();
      }).catch(e => {
        alert("gagal menghapus teknisi")
        window.location.reload();
      })
  }
  function updateTeknisi(v){
    setTeknisiNik(v)
  }
  function getUsers() {
    axios.post(server+'/leader/teknisi',{},{withCredentials: true})
    .then(e => {
      setUser(e.data)
      setUserD(e.data)
    }).catch(e => {
      console.log(e)
    })
  }
  function updateSektor2(v){
    setSektorV(v)
    if(!v){
      return 
    }
    let _ = users.filter(e => e.Sektor == v)
    setUserD(_)
  }
  function updateSektor(v){
    setWitelV(v)
    if(!v){
      return setSektorD([])
    }
    let _ = witelFD.find(e => e.name == v)
    setSektorD(_.sektor.filter((e,i) => _.sektor.indexOf(e) == i))
    //console.log(_.sektor.filter((e,i) => _.sektor.indexOf(e) == i))

  }
  function updateWitel(v){
    setSektorV("")
    setWitelV("")
    //updateWitel("")
    //alert(v)
    if(!v){
      alert(v)
      setSektorV("")
      setWitelD([])
      setSektorD([])
      return 
    }
    let _ = regionalFD.find(e => e.name == v)
    // console.log(_,v)
    setWitelD(_.witel.filter((e,i) => _.witel.indexOf(e) === i)) 
    // console.log(witelD)
    // Frint 
    axios.get(server+"/leader/witel",{withCredentials: true})
    .then(e => {
      setWitelFD(e.data)
    }).catch(e => {
      console.log(e)
    })

  }
  // Handle Select HTML 
  function regionalSelect(v){
    if(v == ""){
      return 
    }
    updateWitel(v) 
  }
  // call async function here 
  useEffect(() => {
      getRegional() 
      getUsers()
  }, [])
  
  // FOUR 
  return (
    <div className="flex flex-row">
      {/* TAMBAH TEKNISI*/}
      <form className="flex flex-col space-y-3 p-3 basis-1/2">
        {/* KOLOM 1*/}
        <div className="flex flex-row space-x-2">
          {/* BIKIN NIK */}
          <div className="flex flex-col space-y-2">
            <label className="font-bold">NIK</label>
            <input
              type="text"
              name="nik"
              className="rounded-lg py-1.5 px-3 border-2 border-slate-400"
              onChange={(e) => setNik(e.target.value)}
              // onChange={(e) => setBuatNIK(e.target.value)}
            />
          </div>
          {/* BIKIN NIK */}
          <div className="flex flex-col space-y-2">
            <label className="font-bold">Nama</label>
            <input
              type="text"
              name="nik"
              className="rounded-lg py-1.5 px-3 border-2 border-slate-400"
              // onChange={(e) => setBuatNIK(e.target.value)}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
        </div>

        {/* KOLOM 2*/}
        <div className="flex flex-row space-x-2">
          {/* BIKIN NIK */}
          <div className="flex flex-col space-y-2">
            <label className="font-bold">ID Telegram</label>
            <input
              type="text"
              name="nik"
              className="rounded-lg py-1.5 px-3 border-2 border-slate-400"
              onChange={(e) => setIdTelegram(e.target.value)}
              // onChange={(e) => setBuatNIK(e.target.value)}
            />
          </div>
          {/* BIKIN NIK */}
          <div className="flex flex-col space-y-2">
            <label className="font-bold">Nama Mitra</label>
            <input
              type="text"
              name="nik"
              className="rounded-lg py-1.5 px-3 border-2 border-slate-400"
              onChange={(e) => setNamaMitra(e.target.value)}
              // onChange={(e) => setBuatNIK(e.target.value)}
            />
          </div>
        </div>

        {/* KOLOM 3*/}
        <div className="flex flex-row space-x-2">
          {/* BIKIN NIK */}
          <div className="flex flex-col space-y-2">
            <label className="font-bold">Sektor</label>
            <input
              type="text"
              name="nik"
              className="rounded-lg py-1.5 px-3 border-2 border-slate-400"
              onChange={(e) => setSektor(e.target.value)}
              // onChange={(e) => setBuatNIK(e.target.value)}
            />
          </div>
          {/* BIKIN NIK */}
          <div className="flex flex-col space-y-2">
            <label className="font-bold">Witel</label>
            <input
              type="text"
              name="nik"
              className="rounded-lg py-1.5 px-3 border-2 border-slate-400"
              onChange={(e) => setWitel(e.target.value)}
              // onChange={(e) => setBuatNIK(e.target.value)}
            />
          </div>
        </div>

        {/* KOLOM 4*/}
        <div className="flex flex-row space-x-2">
          {/* BIKIN NIK */}
          <div className="flex flex-col space-y-2">
            <label className="font-bold">Regional</label>
            <input
              type="text"
              name="nik"
              className="rounded-lg py-1.5 px-3 border-2 border-slate-400"
              onChange={(e) => setRegional(e.target.value)}
              // onChange={(e) => setBuatNIK(e.target.value)}
            />
          </div>
        </div>

        {/* TOMBOL DAFTAR */}
        <div className="pt-3">
          <button
            className="font-bold py-2 px-3 bg-blue-500 rounded-lg hover:bg-blue-400 text-slate-50"
            type="button"
            onClick={(e) => Daftar()}
            title="Tambah Teknisi"
          >
            Tambah Teknisi
          </button>
        </div>
      </form>

      {
      /* 
       *
       *
       * SPACE HERE 
       *
       *
       * 
       */
      }

      {/* DELETE TEKNISI */}
      <div className="flex flex-col space-y-3 p-3 basis-1/2">
        {/* KOLOM 1*/}
        <div className="flex flex-row space-x-2 w-full">
          {/*PILIH REGIONAL*/}
          <div className="flex flex-col basis-1/2">
            <label className="font-bold px-2 py-1.5">Pilih Regional</label>
            <select
              name="nama_teknisi"
              onChange={e => regionalSelect(e.target.value)}
              className="w-full rounded-lg py-1.5 px-3 border-2 border-slate-400 bg-inherit focus:rounded-lg"
            >
              { regionalFD == 0 && <option value="">Pilih Regional</option> } 
              { regionalFD != 0 && <option value="">Pilih Regional</option> } 
              { regionalFD != 0 && regionalFD.map(res => {
                return (
                  <option value={res.name}>{res.name}</option>
                )
              })}
            </select>
          </div>

          {/*PILIH Witel*/}
          <div className="flex flex-col basis-1/2">
            <label className="font-bold px-2 py-1.5">Pilih Witel</label>
            <select
              name="nama_teknisi"
              value={witelV}
              onChange={e => updateSektor(e.target.value)}
              className="w-full rounded-lg py-1.5 px-3 border-2 border-slate-400 bg-inherit focus:rounded-lg"
            >
            {witelD.length != 0 && <option value="">Pilih Witel</option>}
            {witelD.length == 0 && <option value="">Pilih Witel</option>}
            {witelD.map(e => {
              return <option value={e} >{e}</option>
            })}
              
            </select>
          </div>
        </div>

        {/* KOLOM 2*/}
        <div className="flex flex-row space-x-2 w-full">
          {/*PILIH Sektor*/}
          <div className="flex flex-col basis-1/2">
            <label className="font-bold px-2 py-1.5">Pilih Sektor</label>
            <select
              name="nama_teknisi"
              value={sektorV}
              onChange={e => updateSektor2(e.target.value)}
              className="w-full rounded-lg py-1.5 px-3 border-2 border-slate-400 bg-inherit focus:rounded-lg"
            >
              { sektorD.length != 0 && <option value="">Pilih Sektor</option> }
              { sektorD.length == 0 && <option value="">Pilih Sektor</option> }
              { sektorD.map( e => {
                return ( <option value={e}>{e}</option> )
              }) }
            </select>
          </div>

          {/*Nama Teknisi*/}
          <div className="flex flex-col basis-1/2">
            <label className="font-bold px-2 py-1.5">Nama Teknisi</label>
            <select
              name="nama_teknisi"
              value={teknisiNik}
              onChange={e => updateTeknisi(e.target.value)}
              className="w-full rounded-lg py-1.5 px-3 border-2 border-slate-400 bg-inherit focus:rounded-lg"
            >
            { userD.length != 0 && <option value="">Pilih Teknisi</option>}
            { userD.length == 0 && <option value="">Pilih Teknisi</option>}
            { userD.map( e => {
              return <option value={e.NIK}>{e.NIK} {e.Nama}</option>
            })}
            </select>
          </div>
        </div>

        {/* BUTTON */}
        <div className="pt-3">
          <button
            className="font-bold py-2 px-3 bg-red-500 rounded-lg hover:bg-red-400 text-slate-50"
            type="button"
            onClick={(e) => removeTeknisi()}
            title="Hapus Teknisi"
          >
            Hapus Teknisi
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTeknisi;
