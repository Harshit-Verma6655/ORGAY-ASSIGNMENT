export async function viewed(obj) {
    console.log("notify obj", obj);

    let res = await fetch('http://localhost:4000/viewed', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(obj)
    });
    let data = await res.json();
    return data;
}