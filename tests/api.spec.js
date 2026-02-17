import { expect } from "@playwright/test";
import { test } from "../src/helpers/fixtures/api.fuxture";
import { faker } from "@faker-js/faker";
import 'dotenv/config';


const API_URL = "https://airportgap.com/api";

test("Получение списка аэропортов", async ({ api }) => {
  const {data:body} = await api.getAllAirports();
  const airports = body.data;

  expect(Array.isArray(airports)).toBe(true);
  expect(airports.length).toBeGreaterThan(0);

  // Функция для проверки структуры одного аэропорта
  const checkAirport = (airport) => {
    expect(airport).toHaveProperty("id");
    expect(typeof airport.id).toBe("string");

    expect(airport).toHaveProperty("type");
    expect(airport.type).toBe("airport");

    expect(airport).toHaveProperty("attributes");
    const attr = airport.attributes;
    expect(attr).toBeDefined();

    const keys = [
      "altitude",
      "city",
      "country",
      "iata",
      "icao",
      "latitude",
      "longitude",
      "name",
      "timezone",
    ];
    keys.forEach((key) => {
      expect(attr).toHaveProperty(key);
      expect(attr[key]).toBeDefined();
    });
  };
  airports.forEach(checkAirport);
});
test("Расстояние между аэропортами", async ({ api }) => {
  const token = await api.getAuthToken({ email: process.env.EMAIL, password: process.env.PASSWORD });
  const { originAirport, destinationAirport } = await api.prepareAirportsAndFavorite(token);

  const { data: body, response } = await api.getDistance(token, originAirport, destinationAirport);

  expect(response.status()).toBe(200);
  expect(body?.data?.attributes?.kilometers).toBeDefined();
  expect(body?.data?.attributes?.kilometers).toBeGreaterThan(0);
});
test("Добавление и удаление аэропорта в избранное", async ({api
}) => {
  const token = await api.getAuthToken({ email: process.env.EMAIL, password: process.env.PASSWORD });
  const { originAirport } = await api.prepareAirportsAndFavorite(token);

  await api.clearFavorites(token);

  const { data: addData, response: addResponse } = await api.addAirportToFavorites(token, originAirport);
  expect(addResponse.status()).toBe(201);
  const favoriteId = addData?.data?.id;
  expect(favoriteId).toBeDefined();
  expect(addData?.data?.attributes?.airport?.iata).toBe(originAirport);

  const { response: delResponse } = await api.removeFavorite(token, favoriteId);
  expect(delResponse.status()).toBe(204);

});
test("Полная очистка избранного", async ({ api }) => {
  const token = await api.getAuthToken({ email: process.env.EMAIL, password: process.env.PASSWORD });
  const { response, data } = await api.clearFavorites(token);

  expect(response.status()).toBe(204);
  expect(data).toBeNull();
});

test("Обновление заметки в избранном", async ({ api }) => {
  const token = await api.getAuthToken({ email: process.env.EMAIL, password: process.env.PASSWORD });
  const { originAirport } = await api.prepareAirportsAndFavorite(token);

  await api.clearFavorites(token);

  const { data: addData } = await api.addAirportToFavorites(token, originAirport);
  const favoriteId = addData.data.id;

  const newNote = faker.lorem.sentence();
  const { data, response } = await api.updateFavoriteNote(token, favoriteId, newNote);

  expect(response.status()).toBe(200);
  expect(data.data.attributes.note).toBe(newNote);
});



