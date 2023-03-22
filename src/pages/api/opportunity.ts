import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';



type Opportunity = {
  description: string,
  supply: string
}

type Opportunities = Opportunity[];

export default async function opportunityHandler(
  req: NextApiRequest,
  res: NextApiResponse<Opportunity | Opportunities>
) {
  const { body, method } = req;

  switch(method) {
    case 'GET':
      const opportunities = await prisma.opportunity.findMany() as Opportunities;
      return res.status(200).json(opportunities);
    case 'POST':
      const createdOpportunity = await prisma.opportunity.create({
        data: {
          ...body,
        }
      })
      return res.status(201).json(createdOpportunity);
  }
}
