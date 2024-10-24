import { Database } from "duckdb-async";

async function up() {
  const db = await Database.create("local.ddb");

  await db.exec(`
    INSTALL spatial;
    LOAD spatial;
    
    CREATE TABLE Customer (
      id VARCHAR PRIMARY KEY,
      location GEOMETRY NOT NULL
    );

    CREATE SEQUENCE seq_invoiceId START 1;

    CREATE TABLE Invoice (
      id UINTEGER PRIMARY KEY DEFAULT nextval('seq_invoiceId'),
      customerId VARCHAR NOT NULL REFERENCES Customer(id),
      submittedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      total UINTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE Zone (
      id VARCHAR PRIMARY KEY,
      color VARCHAR NOT NULL DEFAULT '#ff0000',
      boundary GEOMETRY NOT NULL
    );
  `);

  await db.close();
}

async function down() {
  const db = await Database.create("local.ddb");

  await db.exec(`
    DROP TABLE Zone;
    DROP TABLE Invoice;
    DROP SEQUENCE seq_invoiceId;
    DROP TABLE Customer;
  `);

  await db.close();
}

async function seed() {
  const db = await Database.create("local.ddb");

  await db.exec(`
    INSTALL spatial;
    LOAD spatial;

    DELETE FROM Zone;
    DELETE FROM Invoice;
    DELETE FROM Customer;

    INSERT INTO Customer (id, location) VALUES
    ('Midwest Metalworks Co.', ST_POINT(-90.277825, 38.514232)),
    ('PrairiePlastics Inc.', ST_POINT(-90.260301, 38.548248)),
    ('Heartland Fabrication Group', ST_POINT(-90.246516, 38.665498)),
    ('Midfield Chemicals Corporation', ST_POINT(-90.292925, 38.729309)),
    ('Rustic Machinery Solutions', ST_POINT(-90.318075, 38.714327)),
    ('Lakeside Logistics Enterprises', ST_POINT(-90.439181, 38.559154)),
    ('Midwest Milling & Manufacturing', ST_POINT(-90.349623, 38.547541)),
    ('Prairie Precision Engineering', ST_POINT(-90.332932, 38.713572)),
    ('Heartland Industrial Solutions', ST_POINT(-90.228897, 38.726631)),
    ('Bistate Construction & Contracting', ST_POINT(-90.364997, 38.555549)),
    ('Great Plains Gearworks', ST_POINT(-90.2165, 38.598264)),
    ('River Valley Refining Co.', ST_POINT(-90.441744, 38.523245)),
    ('Midwest Machine Tooling Ltd.', ST_POINT(-90.339477, 38.682766)),
    ('Prairie Packaging Solutions', ST_POINT(-90.298257, 38.723059)),
    ('Heartland HVAC Services', ST_POINT(-90.365352, 38.624806)),
    ('Central Industrial Supply', ST_POINT(-90.393495, 38.628232)),
    ('Midwest Motors Manufacturing', ST_POINT(-90.231262, 38.653436)),
    ('Wheatland Welding Works', ST_POINT(-90.295492, 38.569624)),
    ('Riverfront Robotics Inc.', ST_POINT(-90.273843, 38.702874)),
    ('Prairie Power & Energy Solutions', ST_POINT(-90.34194, 38.605804)),
    ('Heartland Hydraulics & Engineering', ST_POINT(-90.226698, 38.701984)),       
    ('Midfield Composites Co.', ST_POINT(-90.37491, 38.727456)),
    ('Midwest Foundry & Casting Corporation', ST_POINT(-90.372201, 38.733865)),    
    ('Lakeshore Lubricants Ltd.', ST_POINT(-90.396588, 38.678113)),
    ('Prairie Plating & Finishing Co.', ST_POINT(-90.425922, 38.62596)),
    ('Heartland Heavy Equipment Co.', ST_POINT(-90.425953, 38.613416)),
    ('Bistate Conveyor Systems', ST_POINT(-90.21555, 38.62617)),
    ('Midwest Mining Machinery', ST_POINT(-90.417808, 38.582202)),
    ('Grainland Glass & Glazing', ST_POINT(-90.227221, 38.597021)),
    ('River City Rubber & Plastics', ST_POINT(-90.427847, 38.584145));

    INSERT INTO Invoice (customerId, submittedAt, total) VALUES
    ('Midwest Metalworks Co.', '2024-03-17T19:05:54.945Z', '81424'),
    ('Midwest Metalworks Co.', '2024-02-22T05:12:27.219Z', '36710'),
    ('PrairiePlastics Inc.', '2024-02-01T01:24:11.570Z', '84016'),
    ('PrairiePlastics Inc.', '2024-02-14T12:05:02.775Z', '10631'),
    ('Heartland Fabrication Group', '2024-03-19T23:03:07.673Z', '26631'),
    ('Heartland Fabrication Group', '2024-02-17T12:10:38.145Z', '98477'),
    ('Heartland Fabrication Group', '2024-02-06T05:57:09.320Z', '15522'),
    ('Heartland Fabrication Group', '2024-01-04T03:40:42.591Z', '55612'),
    ('Heartland Fabrication Group', '2024-02-11T11:35:57.291Z', '25288'),
    ('Midfield Chemicals Corporation', '2024-03-20T10:55:08.429Z', '28495'),       
    ('Midfield Chemicals Corporation', '2024-01-27T05:01:07.394Z', '40643'),       
    ('Rustic Machinery Solutions', '2024-03-15T02:38:20.206Z', '20002'),
    ('Rustic Machinery Solutions', '2024-01-13T01:55:11.708Z', '54598'),
    ('Lakeside Logistics Enterprises', '2024-01-27T12:43:35.613Z', '82053'),       
    ('Lakeside Logistics Enterprises', '2024-01-29T12:46:22.941Z', '38250'),       
    ('Midwest Milling & Manufacturing', '2024-03-01T12:34:26.042Z', '77556'),      
    ('Midwest Milling & Manufacturing', '2024-02-09T21:23:41.024Z', '47795'),      
    ('Midwest Milling & Manufacturing', '2024-03-05T05:28:02.711Z', '76658'),      
    ('Prairie Precision Engineering', '2024-01-30T19:18:53.347Z', '24536'),        
    ('Prairie Precision Engineering', '2024-02-03T16:03:09.120Z', '45186'),        
    ('Prairie Precision Engineering', '2024-03-27T03:52:43.912Z', '80096'),        
    ('Prairie Precision Engineering', '2024-03-18T17:46:15.948Z', '59514'),        
    ('Heartland Industrial Solutions', '2024-01-04T04:14:04.136Z', '80801'),       
    ('Heartland Industrial Solutions', '2024-03-10T16:20:24.766Z', '28138'),       
    ('Bistate Construction & Contracting', '2024-02-11T07:14:24.726Z', '34139'),   
    ('Bistate Construction & Contracting', '2024-02-06T16:25:52.814Z', '12935'),   
    ('Bistate Construction & Contracting', '2024-01-03T03:22:03.199Z', '75009'),   
    ('Bistate Construction & Contracting', '2024-03-03T03:38:40.297Z', '32401'),   
    ('Great Plains Gearworks', '2024-02-27T04:41:30.111Z', '18155'),
    ('Great Plains Gearworks', '2024-01-16T09:36:56.656Z', '94236'),
    ('Great Plains Gearworks', '2024-01-19T01:08:05.880Z', '87133'),
    ('River Valley Refining Co.', '2024-02-28T02:08:42.212Z', '85888'),
    ('River Valley Refining Co.', '2024-03-26T06:04:59.356Z', '78796'),
    ('River Valley Refining Co.', '2024-01-17T12:11:22.327Z', '20365'),
    ('Midwest Machine Tooling Ltd.', '2024-01-30T04:24:25.433Z', '25394'),
    ('Midwest Machine Tooling Ltd.', '2024-01-08T01:41:27.191Z', '80229'),
    ('Midwest Machine Tooling Ltd.', '2024-03-28T03:06:55.266Z', '69052'),
    ('Midwest Machine Tooling Ltd.', '2024-03-05T23:55:16.276Z', '34674'),
    ('Midwest Machine Tooling Ltd.', '2024-03-01T23:58:57.548Z', '20938'),
    ('Prairie Packaging Solutions', '2024-01-03T09:52:41.385Z', '10494'),
    ('Prairie Packaging Solutions', '2024-01-01T14:52:12.835Z', '80144'),
    ('Prairie Packaging Solutions', '2024-03-23T11:31:43.261Z', '50583'),
    ('Prairie Packaging Solutions', '2024-03-08T01:55:59.474Z', '19796'),
    ('Prairie Packaging Solutions', '2024-02-13T12:06:11.160Z', '87108'),
    ('Heartland HVAC Services', '2024-01-26T05:19:25.835Z', '85001'),
    ('Heartland HVAC Services', '2024-02-09T19:00:36.303Z', '60569'),
    ('Heartland HVAC Services', '2024-02-15T01:40:25.596Z', '24931'),
    ('Heartland HVAC Services', '2024-01-10T16:20:08.731Z', '91265'),
    ('Central Industrial Supply', '2024-02-13T07:22:45.348Z', '90629'),
    ('Central Industrial Supply', '2024-02-09T11:24:30.614Z', '25478'),
    ('Central Industrial Supply', '2024-01-17T21:56:55.788Z', '27948'),
    ('Central Industrial Supply', '2024-03-17T02:15:07.377Z', '69037'),
    ('Midwest Motors Manufacturing', '2024-01-09T10:43:20.372Z', '88168'),
    ('Midwest Motors Manufacturing', '2024-01-06T11:41:44.899Z', '77389'),
    ('Midwest Motors Manufacturing', '2024-03-03T12:34:50.582Z', '60080'),
    ('Wheatland Welding Works', '2024-02-04T18:36:34.028Z', '75803'),
    ('Wheatland Welding Works', '2024-02-22T04:33:44.306Z', '65413'),
    ('Riverfront Robotics Inc.', '2024-01-23T13:25:15.815Z', '28005'),
    ('Riverfront Robotics Inc.', '2024-03-25T13:09:38.220Z', '15036'),
    ('Prairie Power & Energy Solutions', '2024-01-31T06:11:35.950Z', '61365'),     
    ('Prairie Power & Energy Solutions', '2024-03-16T12:55:48.799Z', '31737'),     
    ('Prairie Power & Energy Solutions', '2024-03-04T07:11:59.626Z', '70480'),     
    ('Heartland Hydraulics & Engineering', '2024-01-31T17:00:43.509Z', '98290'),   
    ('Heartland Hydraulics & Engineering', '2024-02-20T09:36:50.807Z', '19724'),   
    ('Heartland Hydraulics & Engineering', '2024-03-18T00:12:32.611Z', '96326'),   
    ('Heartland Hydraulics & Engineering', '2024-03-15T17:49:14.446Z', '40112'),   
    ('Midfield Composites Co.', '2024-02-11T18:26:12.348Z', '49240'),
    ('Midfield Composites Co.', '2024-01-03T19:24:04.036Z', '58608'),
    ('Midfield Composites Co.', '2024-01-07T03:11:11.172Z', '95082'),
    ('Midfield Composites Co.', '2024-02-27T15:07:47.553Z', '84822'),
    ('Midwest Foundry & Casting Corporation', '2024-02-14T12:39:18.614Z', '42332'),
    ('Midwest Foundry & Casting Corporation', '2024-01-27T07:12:49.835Z', '55112'),
    ('Lakeshore Lubricants Ltd.', '2024-02-09T07:21:27.258Z', '31686'),
    ('Lakeshore Lubricants Ltd.', '2024-02-14T22:32:41.958Z', '72038'),
    ('Lakeshore Lubricants Ltd.', '2024-02-07T03:36:07.723Z', '91923'),
    ('Lakeshore Lubricants Ltd.', '2024-01-20T18:49:33.772Z', '14494'),
    ('Prairie Plating & Finishing Co.', '2024-01-02T23:30:09.180Z', '84303'),      
    ('Prairie Plating & Finishing Co.', '2024-01-06T13:50:14.712Z', '56228'),      
    ('Prairie Plating & Finishing Co.', '2024-02-01T12:47:25.800Z', '42210'),      
    ('Heartland Heavy Equipment Co.', '2024-03-01T03:21:07.679Z', '61410'),        
    ('Heartland Heavy Equipment Co.', '2024-02-28T11:27:06.218Z', '39076'),        
    ('Heartland Heavy Equipment Co.', '2024-01-29T22:59:36.218Z', '69549'),        
    ('Heartland Heavy Equipment Co.', '2024-03-11T11:25:37.261Z', '51926'),        
    ('Bistate Conveyor Systems', '2024-03-02T05:24:48.360Z', '21088'),
    ('Bistate Conveyor Systems', '2024-03-19T19:15:20.119Z', '85959'),
    ('Midwest Mining Machinery', '2024-03-03T08:11:51.109Z', '92681'),
    ('Midwest Mining Machinery', '2024-03-09T05:07:58.782Z', '50003'),
    ('Midwest Mining Machinery', '2024-03-08T07:14:12.541Z', '77080'),
    ('Midwest Mining Machinery', '2024-02-04T20:20:35.396Z', '98374'),
    ('Midwest Mining Machinery', '2024-03-25T07:15:28.731Z', '88471'),
    ('Grainland Glass & Glazing', '2024-03-03T10:48:32.512Z', '34107'),
    ('Grainland Glass & Glazing', '2024-01-15T00:15:57.156Z', '39990'),
    ('River City Rubber & Plastics', '2024-03-05T09:48:23.381Z', '81922'),
    ('River City Rubber & Plastics', '2024-02-18T22:51:25.327Z', '76279'),
    ('River City Rubber & Plastics', '2024-02-21T09:57:56.985Z', '17973');

    INSERT INTO Zone (id, color, boundary) VALUES
    ('Northwest', '#7F3C8D', 'POLYGON ((
      -90.456312 38.758549,
      -90.319976 38.758549,
      -90.319976 38.627769,
      -90.456312 38.627769,
      -90.456312 38.758549
    ))'),
    ('Northeast', '#11A579', 'POLYGON ((
      -90.319976 38.758549,
      -90.188520 38.758549,
      -90.188520 38.627769,
      -90.319976 38.627769,
      -90.319976 38.758549
    ))'),
    ('Southeast', '#3969AC', 'POLYGON ((
      -90.319976 38.627769,
      -90.188520 38.627769,
      -90.188520 38.500000,
      -90.319976 38.500000,
      -90.319976 38.627769
    ))'),
    ('Southwest', '#F2B701', 'POLYGON ((
      -90.456312 38.627769,
      -90.319976 38.627769,
      -90.319976 38.500000,
      -90.456312 38.500000,
      -90.456312 38.627769
    ))');
  `);

  await db.close();
}

if (process.argv[2] === 'up') up();
if (process.argv[2] === 'down') down();
if (process.argv[2] === 'seed') seed();
