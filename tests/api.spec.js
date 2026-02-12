import { expect } from "@playwright/test";
import { AirportService, FavoritesService } from "../src/services/index";
import { test } from "../src/helpers/fixtures/api.fuxture";
import { faker } from "@faker-js/faker";

const API_URL = "https://airportgap.com/api";

test("Получение списка аэропортов", async ({ request }) => {
  const response = await request.get(`${API_URL}/airports`);
  expect(response.status()).toBe(200);

  const body = await response.json();
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
test("Расстояние между аэропортами", async ({
  request,
  token,
  airportData,
}) => {
  const { originAirport, destinationAirport } = airportData;
  const airportService = new AirportService(request, API_URL);
  const response = await airportService.getDistance(
    token,
    originAirport,
    destinationAirport,
  );
  const body = await response.json();
  expect(response.status()).toBe(200);
  expect(body?.data?.attributes?.kilometers).toBeDefined();
  expect(body?.data?.attributes?.kilometers).toBeGreaterThan(0);
});
test("Добавление и удаление аэропорта в избранное", async ({
  request,
  token,
  airportData,
}) => {
  const { originAirport } = airportData;
  const favoritesService = new FavoritesService(request, API_URL);
  await favoritesService.clearAll(token);

  // Добавляем в избранное
  const { data: addData, response: addResponse } = await favoritesService.add(
    token,
    originAirport,
  );
  expect(addResponse.status()).toBe(201);

  const favoriteId = addData?.data?.id;
  expect(favoriteId).toBeDefined();

  // Проверяем, что airport.id соответствует отправленному
  const returnedAirportId = addData?.data?.attributes?.airport?.iata;
  expect(returnedAirportId).toBe(originAirport);

  // Удаляем избранное
  const { data: delData, response: delResponse } =
    await favoritesService.delete(token, favoriteId);
  expect(delResponse.status()).toBe(204);
  expect(delData).toBeNull();
});
test("Полная очистка избранного", async ({ request, token }) => {
  const favoritesService = new FavoritesService(request, API_URL);
  const { data, response } = await favoritesService.clearAll(token);
  expect(response.status()).toBe(204);
  expect(data).toBeNull();
});
test('Обновление заметки в избранном', async ({ request, token }) => {
  const favoritesService = new FavoritesService(request, API_URL);
  const airportService = new AirportService(request, API_URL);

  // 1. Получаем аэропорт динамически
  const { data: airports } = await airportService.getAll();
  const airportId = airports.data[0].id;

  // 2. Очистить избранное
  await favoritesService.clearAll(token);

  // 3. Добавить
  const { data: addData } = await favoritesService.add(token, airportId);
  const favoriteId = addData.data.id;

  // 4. Обновить note
  const newNote = faker.lorem.sentence();

  const { data, response } = await favoritesService.update(
    token,
    favoriteId,
    newNote
  );

  expect(response.status()).toBe(200);
  expect(data.data.attributes.note).toBe(newNote);
});


