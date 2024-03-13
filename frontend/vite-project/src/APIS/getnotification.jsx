export async function getnotification(obj) {
    console.log("notify obj", obj);

    let res = await fetch('http://localhost:4000/getnotification', {
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

