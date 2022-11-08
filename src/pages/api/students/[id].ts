/* eslint-disable @typescript-eslint/no-unused-vars */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next/types'
import { studentData } from 'src/server/data/student'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query
  res.json({ data: studentData.find(v => v.id === id) || null })
}
