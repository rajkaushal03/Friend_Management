import { useEffect, useState } from 'react';
import { BASE_URL } from '../App';
import UserCard from './UserCard';

const UserGrid = ({ users, setUsers,setCopy }) => {
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch(`${BASE_URL}/friends`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error);
                }
                setUsers(data);
                setCopy(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        getUsers();
    }, [setUsers,setCopy]);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} setUsers={setUsers} />
                ))}
            </div>

            {isLoading && (
                <div className="flex justify-center mt-4">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            {!isLoading && users.length === 0 && (
                <div className="flex justify-center mt-4">
                    <p className="text-xl">
                        <span className="text-2xl font-bold mr-2">Poor you! 🥺</span>
                        No friends found.
                    </p>
                </div>
            )}
        </>
    );
};

export default UserGrid;
