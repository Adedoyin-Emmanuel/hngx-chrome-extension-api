import response from "../utils/response";

export default notFound = (req, res) => {
  return response(res, 404, "Route not found");
};
