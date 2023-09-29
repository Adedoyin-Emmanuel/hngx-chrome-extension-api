import { Request, Response } from "express";
import response from "../utils/response";

const errorHandler = (err: Error, req: Request, res: Response, next: any) => {
  console.log(err);
  return response(res, 500, "Something went wrong, please try again later!");
};

export default errorHandler;
