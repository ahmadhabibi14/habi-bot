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

      {/* DELETE TEKNISI */}
      <div className="flex flex-col space-y-3 p-3 basis-1/2">
        {/* KOLOM 1*/}
        <div className="flex flex-row space-x-2 w-full">
          {/*PILIH REGIONAL*/}
          <div className="flex flex-col basis-1/2">
            <label className="font-bold px-2 py-1.5">Pilih Regional</label>
            <select
              name="nama_teknisi"
              className="w-full rounded-lg py-1.5 px-3 border-2 border-slate-400 bg-inherit focus:rounded-lg"
            >
              <option>Pilih Regional</option>
            </select>
          </div>

          {/*PILIH Witel*/}
          <div className="flex flex-col basis-1/2">
            <label className="font-bold px-2 py-1.5">Pilih Witel</label>
            <select
              name="nama_teknisi"
              className="w-full rounded-lg py-1.5 px-3 border-2 border-slate-400 bg-inherit focus:rounded-lg"
            >
              <option>Pilih Witel</option>
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
              className="w-full rounded-lg py-1.5 px-3 border-2 border-slate-400 bg-inherit focus:rounded-lg"
            >
              <option>Pilih Sektor</option>
            </select>
          </div>

          {/*Nama Teknisi*/}
          <div className="flex flex-col basis-1/2">
            <label className="font-bold px-2 py-1.5">Nama Teknisi</label>
            <select
              name="nama_teknisi"
              className="w-full rounded-lg py-1.5 px-3 border-2 border-slate-400 bg-inherit focus:rounded-lg"
            >
              <option>Nama Teknisi</option>
            </select>
          </div>
        </div>

        {/* BUTTON */}
        <div className="pt-3">
          <button
            className="font-bold py-2 px-3 bg-red-500 rounded-lg hover:bg-red-400 text-slate-50"
            type="button"
            // onClick={(e) => Daftar()}
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
