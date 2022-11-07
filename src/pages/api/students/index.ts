// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next/types'

type Data = {
  id: string
  firstName: string
  lastName: string
  attendanceStatus: 'Absent' | 'Present'
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<{ data: Data[] }>) {
  res.status(200).json({
    data: [
      {
        id: 'ereuijbb1',
        firstName: 'Ereyomi',
        lastName: 'Oluwaseyi',
        attendanceStatus: 'Absent'
      },
      {
        id: 'ereuijbb2',
        firstName: 'Samuel',
        lastName: 'Bassey',
        attendanceStatus: 'Absent'
      },
      {
        id: 'ereuijbb3',
        firstName: 'Esther',
        lastName: 'Abdul',
        attendanceStatus: 'Absent'
      }
    ]
  })
}
