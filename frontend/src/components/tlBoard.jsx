import React from "react";

function TlBoard() {
  let data = ""
  if(!localStorage.getItem("Lxpx")){
    window.location.href = "/login"
  }
  data = JSON.parse(localStorage.getItem("Lxpx"))
  
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
      <div className="min-w-8/12 border-2 border-slate-900 flex flex-col">
        <h3 className="text-slate-50 bg-slate-900">Input Performansi</h3>
        <div></div>
      </div>
    </div>
  );
}

export default TlBoard;
