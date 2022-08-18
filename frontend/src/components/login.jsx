import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	let server = "http://localhost:8887";
	let inputNIK = "";
	let error = "";
	let inputPass = "";
	function updateNik(v) {
		inputNIK = v;
	}
	function updatePass(v) {
		inputPass = v;
	}
	async function Masuk() {
		let leaderInfo = await fetch(server + "/leader/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				NIK: inputNIK,
				Password: inputPass,
			}),
		});
		let res = await leaderInfo.json();
		if (leaderInfo.status != 200) {
			return alert(res.msg);
		}
		localStorage.setItem("Lxpx", JSON.stringify(res));
		window.location.href = "/dashboard";
	}
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="flex flex-col space-y-3 p-4">
				<p>{error}</p>
				<form className="flex flex-col space-y-3 border-2 shadow-lg border-slate-200 p-8 rounded-lg bg-slate-100">
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">NIK</label>
						<input
							type="text"
							name="nik"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => updateNik(e.target.value)}
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">Kata Sandi</label>
						<input
							type="password"
							name="password"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							onChange={(e) => updatePass(e.target.value)}
						/>
					</div>
					<div>
						<button
							className="py-2 px-4 bg-blue-400 border-2 border-blue-400 rounded-lg hover:bg-slate-50 hover:text-blue-400 text-slate-50"
							type="button"
							onClick={(e) => Masuk()}
						>
							Masuk
						</button>
					</div>
					<div className="pt-4">
						<p className="text-center">
							Belum punya akun ?{" "}
							<Link
								to="/signup"
								className="text-blue-400 underline hover:text-purple-500"
							>
								Daftar
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
