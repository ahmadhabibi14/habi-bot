import React from "react";

function addTeknisi() {
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
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">NIK</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
      </div>

      {/* KOLOM 1*/}
      <div className="flex flex-row space-x-2">
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">NIK</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">NIK</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
      </div>
      {/* KOLOM 1*/}
      <div className="flex flex-row space-x-2">
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">NIK</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">NIK</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
      </div>
      {/* KOLOM 1*/}
      <div className="flex flex-row space-x-2">
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">NIK</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
        {/* BIKIN NIK */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-900">NIK</label>
          <input
            type="text"
            name="nik"
            className="rounded-lg py-2 px-4 border-2 border-slate-200"
            // onChange={(e) => setBuatNIK(e.target.value)}
          />
        </div>
      </div>

      {/* TOMBOL DAFTAR */}
      <div>
        <button
          className="py-2 px-4 bg-blue-400 border-2 border-blue-400 rounded-lg hover:bg-slate-50 hover:text-blue-400 text-slate-50"
          type="button"
          // onClick={(e) => Daftar()}
        >
          Add Teknisi
        </button>
      </div>
    </form>
  );
}

export default addTeknisi;
