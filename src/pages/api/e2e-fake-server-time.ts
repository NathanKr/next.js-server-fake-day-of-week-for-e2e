// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IServerFakeTime from "@/types/i-server-fake-time";
import type { NextApiRequest, NextApiResponse } from "next";
/* 
 use this import otherwise i get error from react thinking useFakeTimers is a custom hook
*/
import sinon from "sinon"; 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const { serverFakeTimeMs } = req.body as IServerFakeTime;
    
    const env = process.env.NODE_ENV;
    // -- we do not want this on production so protect production from mistakes ........
    // --- todo nath ---> allow only url wwith locallahost
    if (env != "production" && req.url?.includes('localhost')) {

      sinon.restore(); // this is required otherwise you get an error on seting twice
      sinon.useFakeTimers({
        toFake: ["Date"],
        now: new Date(serverFakeTimeMs),
      });
    }

    res.status(200).json({ date: new Date() });
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
