 
import NavBar from "./component/NavBar";
import UserGrid from "./component/UserGrid";
import { useState } from "react";

// updated this after recording. Make sure you do the same so that it can work in production
// export const BASE_URL = "http://0.0.0.0:5000/api"
// eslint-disable-next-line react-refresh/only-export-components
export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

function App() {
	const [users, setUsers] = useState([]);
	const [Copy , setCopy] = useState([]);

	return (
		<div className="min-h-screen flex flex-col">
			<NavBar setUsers={setUsers} users={users} Copy={Copy}/>
			

			<div className="container mx-auto my-4">
				<h1 className="text-3xl md:text-5xl font-bold uppercase text-center mb-8">
					<span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
						Add People information
					</span>
					
				</h1>

				<UserGrid users={users} setUsers={setUsers} setCopy={setCopy}/>
			</div>
		</div>
	);
}

export default App;