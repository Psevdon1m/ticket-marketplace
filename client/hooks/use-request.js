import axios from "axios";
import { useState } from "react";

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      let res = await axios[method](url, body);
      return res.data;
    } catch (error) {
      setErrors(
        <div>
          <h3 className="text-red-500 text-sm font-bold">Errors</h3>
          <ul>
            {error.response.data.errors.map((error) => (
              <li key={error.field} className="text-red-500 list-disc ml-4">
                {error.message}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
