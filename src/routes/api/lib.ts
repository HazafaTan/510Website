export function JSONResponse(data: any) {
    return new Response(JSON.stringify(data), {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}
