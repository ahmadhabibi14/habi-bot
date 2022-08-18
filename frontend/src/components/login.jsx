import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Login() {
	// React States
	const [errorMessages, setErrorMessages] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);

	// USER DATA
	const database = {
		username: "admin",
		password: "password",
	};

	// Kalo error pesan di dalam object ini muncul
	const errors = {
		uname: "invalid username",
		pass: "invalid password",
	};

	const handleSubmit = (event) => {
		// Prevent page reload
		event.preventDefault();

		var { uname, pass } = document.forms[0];

		// Find user login info
		const userData = database.find((user) => user.username === uname.value);

		// Compare user info
		if (userData) {
			if (userData.password !== pass.value) {
				// Invalid password
				setErrorMessages({ name: "pass", message: errors.pass });
			} else {
				setIsSubmitted(true);
			}
		} else {
			// Username not found
			setErrorMessages({ name: "uname", message: errors.uname });
		}
	};

	// Generate JSX code for error message
	const renderErrorMessage = (name) => {
		name === errorMessages.name && (
			<div className="error">{errorMessages.message}</div>
		);
	};

	// JSX code for login form
	const renderForm = (
		<div className="flex justify-center items-center min-h-screen">
			<div className="flex flex-col space-y-3 p-4">
				<form
					onSubmit={handleSubmit()}
					className="flex flex-col space-y-3 border-2 shadow-lg border-slate-200 p-8 rounded-lg bg-slate-100"
				>
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">Username</label>
						<input
							type="text"
							name="uname"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							required
						/>
						{renderErrorMessage("uname")}
					</div>
					<div className="flex flex-col space-y-2">
						<label className="text-slate-900">Kata Sandi</label>
						<input
							type="password"
							name="pass"
							className="rounded-lg py-2 px-4 border-2 border-slate-200"
							required
						/>
						{renderErrorMessage("pass")}
					</div>
					<div>
						<button className="py-1.5 px-4 bg-blue-500 border-2 border-blue-500 rounded-lg text-slate-50 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-900">
							<input type="submit" value="Log In" />
						</button>
					</div>
					<div className="pt-4">
						<p className="text-center">
							Belum punya akun ?{" "}
							<Link
								to="/signup"
								className="text-blue-500 underline hover:text-purple-500"
							>
								Daftar
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);

	return <>{isSubmitted ? <Navigate to="/dashboard" /> : renderForm}</>;
}

export default Login;
