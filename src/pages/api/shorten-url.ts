import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db/client";

function errorMessage(res: NextApiResponse, message: string) {
  res.statusCode = 404;
  res.send(JSON.stringify({ message }));
  return;
}

const shortenUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const { url, slug } = body;

  if (!url || typeof url !== "string" || !slug || typeof slug !== "string") {
    return errorMessage(res, "Invalid URL/Slug!");
  }

  const urlExists = await prisma.shortLink.findFirst({
    where: {
      url,
    },
  });

  if (urlExists) {
    return errorMessage(res, "Slug already created for this URL!");
  }

  const data = await prisma.shortLink.create({
    data: {
      url,
      slug,
    },
  });

  return res.json(data);
};

export default shortenUrl;
