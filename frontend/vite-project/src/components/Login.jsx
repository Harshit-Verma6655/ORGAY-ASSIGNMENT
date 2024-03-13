import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { login } from '../APIS/Login';


function Signup() {
    let navigate = useNavigate();

    // const handleClick = () => {
    //     navigate('/login');
    // }

    // useEffect(() => {
    //     register().then((data) => {
    //         console.log("final", data);
    //     });


    // }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        let obj = {};

        obj.email = e.target[0].value;
        obj.password = e.target[1].value;



        login(obj)

        navigate('/home');
        // then((data) => {
        //     console.log("login...", data);
        //     localStorage.setItem('token', data);
        // })
    }

    return (
        <div className='w-[100vw] h-[100vh] z-50 flex justify-center items-center bg-white border  '

        >
            <div className='flex w-full mx-8 justify-center z-10 '>
                <div className='bg-[url("https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] hidden sm:block shadow-md w-[500px] bg-center' style={{ backgroundSize: "cover" }}>

                </div>
                <div className='sm:w-[510px] bg-white w-full   sm:h-[520px] relative flex flex-col gap-4 justify-center items-center shadow-lg px-[30px] pt-[50px] pb-[30px]  border-gray-200 border'>
                    <button className='absolute -top-6 text-3xl  text-black -right-6 '

                    >


                    </button>
                    <div className='flex bg-white shadow-lg sm:flex-row flex-col sm:rounded-full p-2  items-center gap-6 w-full justify-center'>
                        <h1 className='gradient p-2 rounded-full font-bold text-white w-full'>PERSONAL ACCOUNT</h1>

                    </div>
                    <form className='flex flex-col items-center w-full ' onSubmit={handleSubmit} >

                        <label className='mt-4 text-center w-full font-semibold'>
                            Email<br />
                            <input type='email' name='email' className='border-2 w-full outline-none mt-2 rounded' placeholder=' Enter email' required />
                        </label>
                        <label className='my-4 text-center w-full font-semibold'>
                            Password<br />
                            <input type='password' name='password' className='border-2 w-full outline-none mt-2 rounded' placeholder=' Enter password' required />
                        </label>




                        <button className='bg-gray-300 px-4 w-full rounded-full py-1 mt-4  font-bold text-white hover:bg-gray-500 '

                        >Continue</button>


                    </form>
                </div>
            </div>
        </div >
    )
}

export default Signup