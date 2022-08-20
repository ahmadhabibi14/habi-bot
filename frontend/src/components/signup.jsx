import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
	const [buatNIK, setBuatNIK] = useState("");
	const [inputNama, setNama] = useState("");
	const [inputIdTele, setIdTele] = useState("");
	const [inputNamaMitra, setNamaMitra] = useState("");
	const [inputSektor, setSektor] = useState("");
	const [inputWitel, setWitel] = useState("");
	const [inputRegional, setRegional] = useState("");
	const [buatPass, setBuatPass] = useState("");
  const [firmPass,confirmPass] = useState("")
	const navigate = useNavigate();

	let server = "http://localhost:8887";

	function Daftar() {
		axios
			.post(server + "/leader/signup", {
					NIK: buatNIK,
					Nama: inputNama,
					IDTelegram: inputIdTele,
					NamaMitra: inputNamaMitra,
					Sektor: inputSektor,
					Witel: inputWitel,
					Regional: inputRegional,
					Password: buatPass,
          ConfirmPassword: firmPass 
			}, {withCredentials: true})
			.then((response) => {
				navigate("/login", { replace: true });
			})
			.catch((err) => {
				return alert(err.response.data.msg);
			});
	}

	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="flex flex-col space-y-3 p-4">
				<form className="flex flex-col space-y-3 border-2 shadow-lg border-slate-200 p-8 rounded-lg bg-slate-100">
					{/* BIKIN NIK */}
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">NIK</label>
						<input
							type="text"
							name="nik"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => setBuatNIK(e.target.value)}
						/>
					</div>

					{/* NAMA */}
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">Nama</label>
						<input
							type="text"
							name="nik"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => setNama(e.target.value)}
						/>
					</div>

					{/* ID TELEGRAM */}
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">ID Telegram</label>
						<input
							type="text"
							name="nik"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => setIdTele(e.target.value)}
						/>
					</div>

					{/* NAMA MITRA */}
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">Nama Mitra</label>
						<input
							type="text"
							name="nik"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => setNamaMitra(e.target.value)}
						/>
					</div>

					{/* SEKTOR*/}
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">Sektor</label>
						<input
							type="text"
							name="nik"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => setSektor(e.target.value)}
						/>
					</div>

					{/* WITEL */}
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">Witel</label>
						<input
							type="text"
							name="nik"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => setWitel(e.target.value)}
						/>
					</div>

					{/* REGIONAL*/}
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">Regional</label>
						<input
							type="text"
							name="nik"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => setRegional(e.target.value)}
						/>
					</div>

					{/* BUAT KATA SANDI */}
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">Kata Sandi</label>
						<input
							type="password"
							name="password"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => setBuatPass(e.target.value)}
						/>
					</div>

					{/* KONFIRMASI KATA SANDI */}
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">
							Konfirmasi Kata Sandi
						</label>
						<input
							type="password"
							name="password"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => confirmPass(e.target.value)}
						/>
					</div>

					{/* TOMBOL DAFTAR */}
					<div>
						<button
							className="py-2 px-4 bg-blue-400 border-2 border-blue-400 rounded-lg hover:bg-slate-50 hover:text-blue-400 text-slate-50"
							type="button"
							onClick={(e) => Daftar()}
						>
							Daftar
						</button>
					</div>
					<div className="pt-4">
						<p className="text-center">
							Sudah Punya Akun ?{" "}
							<Link
								to="/login"
								className="text-blue-400 underline hover:text-purple-500"
							>
								Masuk
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
