import axios from "axios";

const apiKey = "e696817a-7d32-49d2-af49-ec687c38a0ab";

export const getAddress = async (latitude: any, longitude: any) => {
  try {
    const response = await axios.get(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${latitude},${longitude}`
    );
    const addressComponents =
      response.data.response.GeoObjectCollection.featureMember[0].GeoObject
        .metaDataProperty.GeocoderMetaData.Address.Components;

    return addressComponents;
  } catch (error) {
    console.log("Unable to retrieve address");
    return [];
  }
};
