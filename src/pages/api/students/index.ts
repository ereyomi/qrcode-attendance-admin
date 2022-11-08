// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next/types'
import { DataI } from 'src/server/model/student.interface'
import {studentData} from 'src/server/data/student'

export default async function handler(_req: NextApiRequest, res: NextApiResponse<{ data: DataI[] }>) {
  res.status(200).json({
    data: studentData
  })
}
