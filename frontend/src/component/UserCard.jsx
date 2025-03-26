import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";
import { useState } from "react";

const UserCard = ({ user, setUsers }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteUser = async () => {
        if (!showConfirm) return;  // Only delete if confirmation is true

        try {
            const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setShowConfirm(false); // Close the modal after action
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
                            onClick={() => setShowConfirm(true)}
                        >
                            <BiTrash size={20} />
                        </button>
                    </div>
                </div>

                <p className="mt-4 text-gray-600">{user.description}</p>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure?</h3>
                        <p className="py-4">Do you really want to delete this user? This action cannot be undone.</p>
                        <div className="modal-action">
                            <button className="btn btn-error" onClick={handleDeleteUser}>Yes</button>
                            <button className="btn" onClick={() => setShowConfirm(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCard;
