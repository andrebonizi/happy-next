// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getRepository } from 'fireorm';
import { NextApiRequest, NextApiResponse } from 'next';
import { Orphanage } from '../../../models/orphanage';

const repository = getRepository(Orphanage);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      const orphanages = await repository.findById(req.query.id as string);
      return res.status(orphanages === null ? 404 : 200).json(orphanages);
    case 'PUT':
      break;

    case 'DELETE':
      break;
    default:
      return (res.statusCode = 500);
  }
};
