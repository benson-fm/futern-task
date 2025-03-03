import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const DataCard = ({ name }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/${name}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center text-lg font-semibold mt-6">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 font-semibold mt-6">
        Error: {error}
      </p>
    );

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      <div className="w-80 bg-white shadow-md rounded-lg p-5 border border-gray-200 transition-transform transform hover:scale-105">
        <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
        <p className="text-gray-600 text-sm">Year: {data.year}</p>
        <p className="text-gray-700 mt-2">{data.description}</p>
        <p className="italic text-blue-500 mt-3">Fun Fact: {data.fun_fact}</p>
      </div>
    </div>
  );
};

DataCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DataCard;
