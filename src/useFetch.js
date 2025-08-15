import { useState, useEffect } from "react";
const useFetch = (url) => {

    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
  
        async function fetchBlogs() {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error("Failed to fetch data for the requested resource.");
          }
          const data = await res.json();
          setBlogs(data);
          setIsPending(false);
          setError(null)
        } catch (error) {
          setIsPending(false)
          setError(error.message);
        }
      }
      fetchBlogs();
    }, [url]);

    return {blogs, isPending, error};
}
 
export default useFetch;