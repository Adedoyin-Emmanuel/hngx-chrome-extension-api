import response from "../utils/response";

const notFound = (req, res) => {
  return response(res, 404, "Route not found");
};


export default notFound;
