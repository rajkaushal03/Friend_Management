import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {

    // console.log(user);
    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
            alert("Friend deleted successfully.");
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={user.imgURL} alt={user.name} />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="card-title capitalize">{user.name}</h2>
                        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <EditModal user={user} setUsers={setUsers} />
                        <button
                            className="btn btn-error btn-sm"
                            onClick={handleDeleteUser}
                        >
                            <BiTrash size={20} />
                        </button>
                    </div>
                </div>

                <p className="mt-4 text-gray-600">{user.description}</p>
            </div>
        </div>
    );
};

export default UserCard;
