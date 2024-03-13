import React, { useEffect, useState } from 'react'
import fetchAdmin from '../APIS/fetchAdmin'
import fetchEmployee from '../APIS/fetchEmployee';
import { useNavigate } from 'react-router-dom';

function Home() {
    let [user, setUser] = useState();
    let navigate = useNavigate();


    let [employee, setEmployee] = useState();
    let detail = JSON.parse(localStorage.getItem('token')) || [];
    console.log("details..", detail);
    useEffect(() => {
        // let detail = JSON.parse(localStorage.getItem('token')) ;
        // console.log("details..", detail);
        fetchAdmin({ id: detail.user, token: detail.token }).then((data) => {
            // console.log(data.user[0]);
            setUser(data.user[0]);

            localStorage.setItem('user', JSON.stringify(data.user[0]))


        })
        if (detail.role == 'admin') {
            fetchEmployee({ role: 'employee', token: detail.token }).then((data) => {
                // console.log(data.user);
                setEmployee(data.user);

            })
        } else if (detail.role == 'employee') {
            fetchEmployee({ role: 'admin', token: detail.token }).then((data) => {
                // console.log(data.user);
                setEmployee(data.user);

            })
        }


    }, [])

    const handleItem = (item) => {
        localStorage.setItem('name', JSON.stringify(item))
        navigate("/user");
    };


    const handlelogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('user');
        navigate("/");
    }


    return (
        <>
            <div className='w-[100vw]  flex gap-36'>
                <div>
                    <h1 className='font-black text-xl'>Admin</h1>
                    <h1>{user?.name}</h1>
                    <h1>{user?.email}</h1>

                </div>
                <div>
                    <h1 className='font-black text-xl'>employees</h1>
                    {employee?.map((item, index) => <h1 key={index}
                        className='cursor-pointer'
                        onClick={() => handleItem(item)}
                    >{item?.name}</h1>)}
                </div>

                <h1 className='font-black text-xl cursor-pointer p-2 bg-black text-white h-fit'
                    onClick={() => navigate("/notifications")}

                >Check Notifications</h1>
            </div>
            <button className='mt-16 bg-black text-white p-2 rounded'
                onClick={handlelogout}
            >Log out</button>


        </>
    )
}

export default Home