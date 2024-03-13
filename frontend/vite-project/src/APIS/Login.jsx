import React from 'react'

export async function login(obj) {

    console.log("api log obj", obj);

    let res = await fetch('http://localhost:4000/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(obj)
    });
    let data = await res.json();
    console.log("loginAPI...", data);
    localStorage.setItem('token', JSON.stringify(data));
    return data;

}