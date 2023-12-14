// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import obj from "sinon"; // because otherwise i get error from react thinking useFakeTimers is a custom module

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const env = process.env.NODE_ENV;

  if (env != "production") {
    obj.useFakeTimers({
      toFake: ["Date"],
      now: new Date(2022, 11, 15, 12, 45, 29),
    });
  }

  res.status(200).json({ date: new Date() });
}
