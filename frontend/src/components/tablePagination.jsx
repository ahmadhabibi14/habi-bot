import React, { useEffect } from "react";

const TablePagination = () => {
	return (
		<div className="flex flex-row justify-center w-full space-x-2 ">
			{/* PREVIOUS BUTTON*/}
			<button className="rounded-lg py-2 px-4 bg-slate-300 hover:bg-emerald-500 hover:text-slate-50 font-bold">
				&lt;
			</button>

			{/* NTAR DISINI ISI NYA NOMOR*/}
			{/* KALO ke PAGE ke 2 dan seterus nya harus berubah*/}
			<button className="rounded-lg py-2 px-4 bg-emerald-500 hover:bg-emerald-300 text-slate-50 font-bold">
				1
			</button>

			{/* NEXT BUTTON */}
			<button className="rounded-lg py-2 px-4 bg-slate-300 hover:bg-emerald-500 hover:text-slate-50 font-bold">
				&gt;
			</button>
		</div>
	);
};

export default TablePagination;
