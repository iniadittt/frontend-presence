const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;

export async function getDataDashboard(token: string) {
    try {
        const res = await fetch(`${baseUrl}/api/dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const response = await res.json();
        return response
    } catch (error) {
        throw new Error("Failed to get data dashboard");
    }
}
