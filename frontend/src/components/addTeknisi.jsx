import React, { useState } from "react";
import axios from "axios";

function AddTeknisi() {
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
      .post("http://localhost:8887" + "/leader/create/teknisi", newTeknisi, {
        withCredentials: true,
      })
      .then((r) => {
        console.log(r);
        alert("teknisi ditambahkan");
      })
      .catch((res) => {
        alert("nik sudah ada tidak bisa menambahkan");
      });
  }

  return (
    <div className="flex flex-row justify-between justify-items-stretch">
      <form className="flex flex-col space-y-3 p-4">
        {/* KOLOM 1*/}
        <div className="flex flex-row space-x-2">
          {/* BIKIN NIK */}
          <div className="flex flex-col space-y-2">
            <label className="text-slate-900">NIK</label>
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
            <label className="text-slate-900">Nama</label>
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
            <label className="text-slate-900">ID Telegram</label>
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
            <label className="text-slate-900">Nama Mitra</label>
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
            <label className="text-slate-900">Sektor</label>
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
            <label className="text-slate-900">Witel</label>
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
            <label className="text-slate-900">Regional</label>
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
        <div>
          <button
            className="flex flex-row items-center space-x-1.5 font-bold py-1 px-3 bg-blue-400 rounded-lg hover:bg-blue-300 text-slate-50"
            type="button"
            onClick={(e) => Daftar()}
            title="Tambah Teknisi"
          >
            <span className="text-2xl">+</span>
            <span>Teknisi</span>
          </button>
        </div>
      </form>

      <div>
        <p>NTAR DISINI DELETE TEKNISI</p>
      </div>
    </div>
  );
}

export default AddTeknisi;
