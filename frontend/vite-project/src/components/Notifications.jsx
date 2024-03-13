import React, { useEffect, useState } from 'react'
import { getnotification } from '../APIS/getnotification'
import { viewed } from '../APIS/viewed';

function Notifications() {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = JSON.parse(localStorage.getItem('token'));
    let [length, setLength] = useState();
    let [data, setData] = useState();
    let [checked, setchecked] = useState(false);
    useEffect(() => {
        getnotification({ "recieverId": user._id, "token": token.token }).then((data) => {
            console.log("notify data", data);
            setLength(data.data.length);
            setData(data.data);
        });

    }, [])

    return (<>
        <div><h1 className='font-black text-xl'>Notifications {length}</h1></div>
        <div>


            {data?.map((item, index) => <div onClick={() => {
                // setchecked(item?.checked)
                setchecked(true)
                viewed({ "senderId": item?.senderId }).then((data) => {
                    console.log(data);
                    alert("viewed")
                })


            }} className={`${!checked ? "bg-black text-white" : "bg-gray-400 text-black"} rounded-lg p-4 my-5`} key={index}><h1>{item?.senderName}</h1>
                <h1>{item?.msg}</h1>
                {/* <button className='mt-4'
                  
                >{checked ? "viewed" : "view"}</button> */}
            </div>)}

        </div>

    </>


    )
}

export default Notifications