import React from 'react'

async function notification(obj) {
    console.log("notify obj", obj);

    let res = await fetch('http://localhost:4000/notification', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${obj.token}`,
        },
        body: JSON.stringify(obj)
    });
    let data = await res.json();
    return data;
}

export default notification