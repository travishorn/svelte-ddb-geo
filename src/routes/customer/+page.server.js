import { db } from "$lib/server/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const dbRes = await db.all(`
    SELECT    c.id,
              ST_AsGeoJSON(c.location) AS location,
              SUM(i.total) invoiceTotal
    FROM      Customer c
    LEFT JOIN Invoice i
    ON        i.customerId = c.id
    GROUP BY  c.id,
              c.location;
  `);

  const customers = dbRes.map((customer) => {
    return {
      ...customer,
      invoiceTotal: Number(customer.invoiceTotal),
      location: JSON.parse(customer.location)
    };
  })

	return {
		customers
	};
}
