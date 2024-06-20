/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { year, month } = req.query

  if (!year || !month) {
    return res.status(400).json({ message: 'Year or month not provided' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exist.' })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDays) => availableWeekDays.week_day === weekDay,
    )
  })

  const blockedDatesRaw: Array<{ day: number }> = await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM S.date) AS day,
      COUNT(S.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

    FROM schedulings S

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))
      AND UTI.user_id = S.user_id

    WHERE S.user_id = ${user.id}
      AND EXTRACT(YEAR from S.date) = ${year}
      AND EXTRACT(MONTH from S.date) = ${month}
    
    GROUP BY day, size
  `

  const blockedDates = blockedDatesRaw.map((item) => item.day)

  return res.json({ blockedWeekDays, blockedDates })
}
