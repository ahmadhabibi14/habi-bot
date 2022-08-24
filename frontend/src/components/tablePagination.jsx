import React, { useEffect, useState } from "react";
import axios from "axios";
import Comp from "./dashBoard";
const TablePagination = (props) => {
  let from = 0;
  let to = 10;
  let [i, setI] = useState(1);
  let server = "http://localhost:8887";
  function Next() {
    from += 10;
    to += 10;
    if (props.Data.length < 10) {
      from -= 10;
      to -= 10;
      console.log(i);
      alert("Page Terakhir");
      return;
    }
    axios
      .post(
        server + "/leader/teknisi",
        {
          from,
          to,
          filter: props.filter,
        },
        { withCredentials: true }
      )
      .then((e) => {
        if (e.data.length < 10) {
          props.setData(e.data);
          setI(i + 1);
          //console.log(i)
          //alert("Page Terakhir")
          return;
        }
      })
      .catch((e) => {
        alert("Something Error");
      });
  }
  function Prev() {
    console.log(from);
    if (i == 1) {
      alert("HALAM Pertama");
      return;
    }
    if (props.Data.length < 10) {
      to -= 7 - props.Data.length;
    } else {
      to -= 10;
    }
    from -= 10;
    if (from < 0) {
      from = 0;
    }
    axios
      .post(
        server + "/leader/teknisi",
        {
          from,
          to,
          filter: props.filter,
        },
        { withCredentials: true }
      )
      .then((e) => {
        props.setData(e.data);
        //console.log(e.data)
        setI(i - 1);
      })
      .catch((e) => {
        alert("Something Error");
      });
  }
  return (
    <div className="flex flex-row justify-center w-full space-x-2 ">
      {/* PREVIOUS BUTTON*/}
      <button
        onClick={(e) => Prev()}
        className="rounded-lg py-2 px-4 bg-slate-300 hover:bg-emerald-500 hover:text-slate-50 font-bold"
        title="Previous Page"
      >
        &lt;
      </button>

      {/* NTAR DISINI ISI NYA NOMOR*/}
      {/* KALO ke PAGE ke 2 dan seterus nya harus berubah*/}
      <button className="rounded-lg py-2 px-4 bg-emerald-500 hover:bg-emerald-300 text-slate-50 font-bold">
        {i}
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={(e) => Next()}
        className="rounded-lg py-2 px-4 bg-slate-300 hover:bg-emerald-500 hover:text-slate-50 font-bold"
        title="Next Page"
      >
        &gt;
      </button>
    </div>
  );
};

export default TablePagination;
