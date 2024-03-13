import React, { useEffect, useState } from 'react'
import notification from '../APIS/notification';
import { useNavigate } from 'react-router-dom';

function User() {
    // let [user, setUser] = useState();

    let navigate = useNavigate();
    let [msg, setMsg] = useState();
    let item = JSON.parse(localStorage.getItem('name'));
    console.log("item...", item)
    let token = JSON.parse(localStorage.getItem('token'));

    let user = JSON.parse(localStorage.getItem('user'));

    const handleMsg = (e) => {



        setMsg(e.target.value);

    }
    async function handleSend() {
        let obj = {};
        obj.msg = msg;
        obj.senderId = user._id;
        obj.senderName = user.name;
        obj.recieverId = item._id;
        obj.checked = false;
        obj.token = token.token;
        notification(obj).then((data) => {
            console.log("notify data", data);
            alert('message sent!')
            setMsg("");
        })

    }

    return (
        <div className='p-10 shadow-md'>
            <div className='mb-6 flex justify-between'>
                <h1 className='font-black text-xl '>user: {user?.name}</h1>
                <h1 className='font-black text-xl'
                    onClick={() => navigate("/notifications")}

                >Notifications</h1>
            </div>
            <div className='flex gap-6 mb-3 p-2'>
                <h1 className='font-bold text-xl'>{item?.name}</h1>
                <h1 className='font-bold text-xl'>{item?.email}</h1>
            </div>
            <div className='flex gap-4'>
                <input type='text' placeholder='Enter text...'
                    onChange={handleMsg}
                    value={msg}
                />
                <button className='text-white bg-black p-2 rounded'
                    onClick={handleSend}
                >Send</button>
            </div>
        </div>
    )
}

export default User