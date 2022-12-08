import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client";

function errorMessage(res: NextApiResponse, message: string) {
  res.statusCode = 404;
  res.send(JSON.stringify({ message }));
  return;
}

const getUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { slug },
  } = req;

  if (!slug || typeof slug !== "string") {
    return errorMessage(res, "Please use it with a slug!");
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    return errorMessage(res, "Slug not found");
  }

  return res.json(data);
};

export default getUrl;
