
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/blogs/${blogs.id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      history.push("/"); // navigate back to homepage
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blogs && (
        <article>
          <h2>{ blogs.title }</h2>
          <p>Written by { blogs.author }</p>
          <div>{ blogs.body }</div>
          <button onClick={handleDelete}>delete</button>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;
