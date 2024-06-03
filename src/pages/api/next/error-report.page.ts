import type { NextApiRequest, NextApiResponse } from "next";

const errorReportHandler = (req: NextApiRequest, res: NextApiResponse) => {
  console.error(JSON.parse(req.body));
  return res.status(200).json("success");
};

export default errorReportHandler;
