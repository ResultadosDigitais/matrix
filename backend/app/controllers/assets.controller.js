import fs from "fs";

const staticManifestResolver = (manifestFile) => {
  const manifestData = fs.readFileSync(manifestFile);
  const manifest = JSON.parse(manifestData);

  return () => manifest;
};

const lazyManifestResolver = manifestPath => () => {
  const resolver = staticManifestResolver(manifestPath);
  return resolver();
};


const createAssetsResolver = (manifestResolver, assetsBasePath) => {
  const getAssetUrl = (assetName) => {
    const manifest = manifestResolver();
    const asset = manifest[assetName] || assetName;

    return `${assetsBasePath}/${asset}`;
  };

  return {
    url: getAssetUrl,
  };
};


export default { staticManifestResolver, lazyManifestResolver, createAssetsResolver };
