import React from 'react'

export async function fetchAdmin(obj) {


    let res = await fetch('http://localhost:4000/admin', {
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

export default fetchAdmin