import { useEffect, useState } from "react"

export const fetchWithAbortController = (query, page) => {

    const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let abortController = new AbortController();
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://openlibrary.org/search.json?' + new URLSearchParams({
                    q: query,
                    page: page,
                }), {
                    signal: abortController.signal,
                })
                const data = await response.json();

                setFetchedData(data.docs);
            } catch (error) {
                if(error.name === "AbortError"){
                    setError(error);
                }
            }finally{
                setIsLoading(false);
            }
        }
        fetchData();
        return () => {
            abortController.abort();
        }
    }, [query, page])

    return { fetchedData, isLoading, error };

}