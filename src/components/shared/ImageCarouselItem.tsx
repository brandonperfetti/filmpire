import { ImageProps } from "@/types";

const ImageCarouselItem = ({
  image,
  maxWidth = 400,
  maxHeight = 600,
}: {
  image: ImageProps;
  maxWidth?: number;
  maxHeight?: number;
}) => {
  const aspectRatio = image.width / image.height;

  // Calculate the scaled dimensions
  let width = image.width;
  let height = image.height;

  if (width > maxWidth) {
    width = maxWidth;
    height = maxWidth / aspectRatio;
  }

  if (height > maxHeight) {
    height = maxHeight;
    width = maxHeight * aspectRatio;
  }

  return (
    <div className="flex justify-center">
      <img
        src={`https://image.tmdb.org/t/p/original${image.file_path}`}
        alt="Poster"
        style={{ width: `${width}px`, height: `${height}px` }}
        className="rounded shadow-lg"
      />
    </div>
  );
};

export default ImageCarouselItem;
