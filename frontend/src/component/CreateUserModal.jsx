import React, { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { BASE_URL } from '../App';

const CreateUserModal = ({ setUsers }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputs, setInputs] = useState({ name: '', role: '', description: '', gender: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + '/friends', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }

            setUsers((prevUsers) => [...prevUsers, data]);

            setInputs({ name: '', role: '', description: '', gender: '' });
            setIsOpen(false);
        } catch (error) {
            alert('An error occurred: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
                <BiAddToQueue size={20} />
            </button>

            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">My new BFF 😍</h3>
                        <form onSubmit={handleCreateUser}>
                            <div className="flex gap-4 mt-4">
                                <div className="form-control w-full">
                                    <label className="label">Full Name :</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="input input-bordered"
                                        value={inputs.name}
                                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">Role :</label>
                                    <input
                                        type="text"
                                        placeholder="Software Engineer"
                                        className="input input-bordered"
                                        value={inputs.role}
                                        onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-control mt-4">
                                <label className="label">Description :</label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    placeholder="He's a software engineer who loves to code and build things."
                                    value={inputs.description}
                                    onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                                />
                            </div>

                            <div className="form-control flex flex-col mt-4">
                                <label className="label">Gender :</label>
                                <div className="flex gap-4">
                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            className="radio"
                                            onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                                        />
                                        Male
                                    </label>
                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            className="radio"
                                            onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                                        />
                                        Female
                                    </label>
                                </div>
                            </div>

                            <div className="modal-action">
                                <button className={`btn btn-primary ${isLoading && 'loading'}`} type="submit">
                                    Add
                                </button>
                                <button className="btn" onClick={() => setIsOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateUserModal;
