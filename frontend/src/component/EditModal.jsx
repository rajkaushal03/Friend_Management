import React, { useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { BASE_URL } from '../App';

function EditModal({ setUsers, user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [inputs, setInputs] = useState({
        name: user.name,
        role: user.role,
        description: user.description,
        // gender: user.gender || '',
    });

    const handleEditUser = async (e) => {
        e.preventDefault();
        if (!showConfirm) return;  // Only proceed if confirmation is true
        if (inputs.name == "" || inputs.role == "" || inputs.description == "") {
            inputs.name = user.name,
                inputs.role = user.role,
                inputs.description = user.description;
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)));
            // alert('Friend updated successfully!');
            setIsOpen(false);
        } catch (error) {
            console.log(`An error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
            setShowConfirm(false);
        }
    };

    return (
        <div>
            <button className="btn btn-primary btn-sm" onClick={() => setIsOpen(true)}>
                <BiEditAlt size={20} />
            </button>

            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Update information 😍</h3>
                        <form onSubmit={(e) => {

                            ; e.preventDefault(); setShowConfirm(true);
                        }}>
                            <div className="flex gap-4 mt-4">
                                <div className="form-control w-full">
                                    <label className="label">Full Name:</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="input input-bordered"
                                        value={inputs.name}
                                        onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">Role:</label>
                                    <input
                                        type="text"
                                        placeholder="Software Engineer"
                                        className="input input-bordered"
                                        value={inputs.role}
                                        onChange={(e) => setInputs((prev) => ({ ...prev, role: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="form-control mt-4 flex flex-col gap-3 ">
                                <label className="label">Description:</label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    placeholder="He's a software engineer who loves to code and build things."
                                    value={inputs.description}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
                                />
                            </div>

                          

                            <div className="modal-action">
                                <button className="btn btn-primary" type="submit">Update</button>
                                <button className="btn" onClick={() => setIsOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure?</h3>
                        <p className="py-4">Do you really want to update this user?</p>
                        <div className="modal-action">
                            <button className="btn btn-success" onClick={handleEditUser}>Yes</button>
                            <button className="btn" onClick={() => setShowConfirm(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditModal;
