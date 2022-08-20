import React, { useEffect, useState } from "react";
import axios from "axios";

function TlBoard() {
  let server = "http://localhost:8887/";
  let data = "";
  let [user, setUser] = useState([]);
  let [type, setType] = useState();
  let [namaTeknisi, setNamaTeknisi] = useState();
  let [ket, setKeterangan] = useState();
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
      body: JSON.stringify({
        to: 10,
        from: 0,
      }),
    });
    setUser(await getData.json());
    //console.log(user)
  }
  useEffect(() => {
    getUsers();
  }, []);
  let NameTeknisi = user.map((e) => {
    return e.Nama;
  });
  let TeknisiNik = user.map((e) => {
    return e.NIK + " " + e.Nama;
  });

  async function submit() {
    console.log(type, namaTeknisi, ket);
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
      <div className="min-w-8/12 border-2 border-slate-900 flex flex-col w-8/12 ml-10">
        <h3 className="text-slate-50 bg-slate-900 px-4 py-2">
          Input Performansi
        </h3>

        <div className="flex flex-col p-8 space-y-3.5">
          {/*// NIK / Nama Teknisi*/}
          <div className="flex flex-row justify-between items-start">
            <label>NIK / Nama Teknisi</label>
            <select
              onChange={(e) => setNamaTeknisi(e.target.value)}
              name="nama_teknisi"
              className="py-1 px-2 bg-inherit border-2 border-slate-900 rounded-lg focus:rounded-lg"
            >
              {user.map((e) => {
                return (
                  <option key={e.NIK} value={e.NIK}>
                    {e.NIK + " " + e.Nama}
                  </option>
                );
              })}
            </select>
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
              <option value="gamasTipeA">Gamas Tipe A</option>
              <option value="gamasTipeB">Gamas Tipe B</option>
              <option value="gamasTipeC">Gamas Tipe C</option>
              <option value="tugasTl">Tugas TL</option>
            </select>
          </div>

          <hr />

          {/*// Jumlah nilai yang akan di asign
          <div className="flex flex-row justify-between items-start">
            <label>Jumlah nilai yang akan di asign</label>
            <input
              className="w-16 py-1 px-2 focus:px-2 focus:py-1 focus:ring-2 ring-2 border-1 border-slate-900 outline-2 outline-slate-800 ring-2 ring-slate-900 rounded-md"
              type="number"
              name="number"
              min="1"
            />
          </div>

          <hr />
          */}
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
