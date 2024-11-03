import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { searchService } from "../services/search";

//#region GET BLOG BY ID
export interface FindConcertBody {
  artist?: string;
  country?: string;
}
export const findConcert: RequestHandler<
  unknown,
  unknown,
  FindConcertBody,
  unknown
> = async (req, res, next) => {
  const artist = req.body.artist?.toLowerCase();
  const country = req.body.country?.toLowerCase();

  try {
    if (!artist || !country) {
      throw createHttpError(400, "Missing parameters");
    }

    console.log("gelen veriler:", artist, country);

    const searchResults = await searchService.searchConcerts(artist, country);

    res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};
//#endregion
