// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IServerInfo from "@/types/i-server-info";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";

function isSalesDay(): boolean {
  const currentDayOfWeek = dayjs().day();

  // Check if today is Wednesday (3 corresponds to Wednesday)
  return currentDayOfWeek === 3;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const serverInfo: IServerInfo = {
    serverNowMs: new Date().getTime(),
    isSalesDay: isSalesDay(),
  };

  res.status(200).json({ ...serverInfo });
}
