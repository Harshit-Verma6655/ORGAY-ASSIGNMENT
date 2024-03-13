import React from 'react'

export async function register(obj) {

    console.log("api obj", obj);

    let res = await fetch('http://localhost:4000/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(obj)
    });
    let data = await res.json();
    return data;

}



