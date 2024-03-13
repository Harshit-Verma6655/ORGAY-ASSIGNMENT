import React from 'react'

export async function fetchEmployee(obj) {


    let res = await fetch('http://localhost:4000/users', {
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

export default fetchEmployee