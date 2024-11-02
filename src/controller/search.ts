import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { searchService } from "../services/search";


//#region GET BLOG BY ID
export const getConcert: RequestHandler = async (req, res, next) => {
  const artist = req.params.artist;
  const country = req.params.country;

  try {
    if (!artist || !country) {
      throw createHttpError(400, "Missing parameters");
    }

    const searchResults = await searchService.searchConcerts(artist, country);

    res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};
//#endregion
