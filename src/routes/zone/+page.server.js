import { db } from "$lib/server/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const dbRes = await db.all(`
    SELECT    z.id,
              z.color,
              ST_AsGeoJSON(z.boundary) boundary,
              ST_AsGeoJSON(ST_Centroid(z.boundary)) centroid
    FROM      Zone z;
  `);

  const zones = dbRes.map((zone) => {
    return {
      ...zone,
      boundary: JSON.parse(zone.boundary),
      centroid: JSON.parse(zone.centroid)
    };
  });

	return {
		zones
	};
}
