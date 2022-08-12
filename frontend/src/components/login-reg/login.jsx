import React from "react";

function Login() {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="flex flex-col space-y-3 p-4">
				<input type="text" className="border border-slate-900" />
				<input type="text" className="border border-slate-900" />
				<button className="bg-blue-400 text-slate-50">LOGIN</button>
				<p>Belum punya akun?</p>
			</div>
		</div>
	);
}

export default Login;
