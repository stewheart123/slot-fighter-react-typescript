import { Texture } from "pixi.js";

let assets = {
  textures: [] as Texture[],
  symbolTextures: [] as Texture[],
  animation: undefined as any | undefined,
  akumaSprites: [] as Texture[],
  mai: {
    spriteSheet: undefined as Texture | undefined,
    spriteData: undefined as any | undefined,
  },
  akuma: {
    spriteSheet: undefined as Texture | undefined,
    spriteData: undefined as any | undefined,
  },
  //animationResources: [] as any
};
export default assets;
