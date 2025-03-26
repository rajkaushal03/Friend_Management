import React, { useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { BASE_URL } from '../App';

function EditModal({ setUsers, user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: user.name,
        role: user.role,
        description: user.description,
        // gender: user.gender || '',
    });

    const handleEditUser = async (e) => {
        e.preventDefault();
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
            alert('Friend updated successfully!');
            setIsOpen(false);
        } catch (error) {
            console.log(`An error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
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
                        <h3 className="font-bold text-lg">My new BFF 😍</h3>
                        <form onSubmit={handleEditUser}>
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

                            {/* Gender Selection */}
                            <div className="form-control mt-4">
                                <label className="label">Gender:</label>
                                <div className="flex gap-4">
                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            className="radio checked:bg-blue-500"
                                            checked={inputs.gender === 'male'}
                                            onChange={(e) => setInputs((prev) => ({ ...prev, gender: e.target.value }))}
                                        />
                                        <span className="ml-2">Male</span>
                                    </label>

                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            className="radio checked:bg-pink-500"
                                            checked={inputs.gender === 'female'}
                                            onChange={(e) => setInputs((prev) => ({ ...prev, gender: e.target.value }))}
                                        />
                                        <span className="ml-2">Female</span>
                                    </label>
                                </div>
                            </div>

                            <div className="modal-action">
                                <button
                                    className={`btn btn-primary ${isLoading && 'loading'}`}
                                    type="submit"
                                >
                                    Update
                                </button>
                                <button className="btn" onClick={() => setIsOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditModal;