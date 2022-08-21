import React,{useState} from "react";
import axios from "axios";

function AddTeknisi() {
  let newTeknisi = {
    NIK : 0,
    Nama : "",
    IDTelegram : "",
    NamaMitra : "",
    Sektor : "",
    Witel : "",
    Regional : "",
    Handle : [],
    point : 0
  }
  // HOOK 
  const [nik,setNik] = useState(0)
  const [nama,setNama] = useState(0)
  const [idTelegram,setIdTelegram] = useState(0)
  const [namaMitra,setNamaMitra] = useState(0)
  const [sektor,setSektor] = useState(0)
  const [witel,setWitel] = useState(0)
  const [regional,setRegional] = useState(0)
  
  function Daftar(){
    newTeknisi.NIK = nik 
    newTeknisi.Nama = nama
    newTeknisi.IDTelegram = idTelegram
    newTeknisi.NamaMitra = namaMitra
    newTeknisi.Sektor = sektor
    newTeknisi.Witel = witel
    newTeknisi.Regional = regional
    axios
      .post(
        "http://localhost:8887"+"/leader/create/teknisi",
        newTeknisi,
        {withCredentials : true}
    )
      .then((r)=>{
        console.log(r)
        alert("teknisi ditambahkan")
      })
      .catch((res)=>{
        alert("nik sudah ada tidak bisa menambahkan")
      })
  }

  return (
    <form className="flex flex-col space-y-3 border-2 shadow-lg border-slate-200 p-8 rounded-lg bg-slate-100">
      {/* KOLOM 1*/}
      <div className="flex flex-row space-x-2">
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">NIK</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            onChange = {e => setNik(e.target.value)}
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">Nama</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            // onChange={(e) => setBuatNIK(e.target.value)}
            onChange = {e => setNama(e.target.value)}
          />
        </div>
      </div>

      {/* KOLOM 1*/}
      <div className="flex flex-row space-x-2">
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">ID Telegram</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            onChange = {e => setIdTelegram(e.target.value)}
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">Nama Mitra</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
             onChange = {e => setNamaMitra(e.target.value)}   
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
      </div>
      {/* KOLOM 1*/}
      <div className="flex flex-row space-x-2">
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">Sektor</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            onChange = {e => setSektor(e.target.value)}
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">Witel</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            onChange = {e => setWitel(e.target.value)}
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
      </div>
      {/* KOLOM 1*/}
      <div className="flex flex-row space-x-2">
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">Regional</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            onChange = {e => setRegional(e.target.value)}
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
      </div>

      {/* TOMBOL DAFTAR */}
      <div>
        <button
          className="py-2 px-4 bg-blue-400 border-2 border-blue-400 rounded-lg hover:bg-slate-50 hover:text-blue-400 text-slate-50"
          type="button"
          onClick={(e) => Daftar()}
        >
          Add Teknisi
        </button>
      </div>
    </form>
  );
}

export default AddTeknisi;

