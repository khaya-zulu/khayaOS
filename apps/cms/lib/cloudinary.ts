export const b64EncodeCloudinaryImage = async ({
  version,
  publicId,
  format,
}: {
  version: string;
  publicId: string;
  format: string;
}) => {
  const blurredUrl = `https://res.cloudinary.com/khaya-zulu/image/upload/w_100,q_auto,f_webp,e_blur:1000/v${version}/${publicId}`;

  const resp = await fetch(blurredUrl);
  const buffer = await resp.arrayBuffer();

  return `data:image/${format};base64,${Buffer.from(buffer).toString(
    "base64"
  )}`;
};
