import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    res.status(200).json({ status: "Health" });
  } catch {
    res.status(400).json({ status: "Error" });
  }
}
