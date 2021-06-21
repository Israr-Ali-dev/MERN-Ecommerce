import { customProvider } from './dataProviders';

const dataProvider = customProvider;

const imageUploadProvider = {
  ...dataProvider,
  create: (resource, params) => {
    if (
      (resource !== 'products' &&
        resource !== 'cases' &&
        resource !== 'phonemodel') ||
      !params.data.photo
    ) {
      // fallback to the default implementation
      return dataProvider.create(resource, params);
    }

    //For one file
    const newPictures = params.data.photo;

    return Promise.resolve(convertFileToBase64(newPictures))
      .then((picture64) => ({
        data: picture64,
        contentType: `${params.data.photo.title}`,
      }))
      .then((transformedNewPictures) =>
        dataProvider.create(resource, {
          ...params,
          data: {
            ...params.data,
            photo: transformedNewPictures,
          },
        })
      );
  },
  update: (resource, params) => {
    if (
      (resource !== 'products' &&
        resource !== 'cases' &&
        resource !== 'phonemodel') ||
      !params.data.photo
    ) {
      // fallback to the default implementation
      return dataProvider.update(resource, params);
    }

    //For one file
    const newPictures = params.data.photo;

    return Promise.resolve(convertFileToBase64(newPictures))
      .then((picture64) => ({
        data: picture64,
        contentType: `${params.data.photo.title}`,
      }))
      .then((transformedNewPictures) =>
        dataProvider.update(resource, {
          ...params,
          data: {
            ...params.data,
            photo: transformedNewPictures,
          },
        })
      );
  },
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });

export default imageUploadProvider;
