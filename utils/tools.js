import imageUrlBuilder from '@sanity/image-url';
import { clientRead } from './sanity';


const builder = imageUrlBuilder(clientRead);

export function urlFor(source) {
  return builder.image(source)
}
