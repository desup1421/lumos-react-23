import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [lastPage, setLastPage] = useState(null);
	const [response, setResponse] = useState(null);


	useEffect(() => {
		axios.get(url)
			.then((response) => {
				setResponse(response);
				setData(response.data.data);
				setLoading(false);
				setLastPage(response.data.last);
			}).catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, [url]);
	return { data, loading, error, lastPage, response };
}

export default useFetch;