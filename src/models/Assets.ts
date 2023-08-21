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
  introTheme : undefined as Howl | undefined,
  levelSoundtrack : undefined as Howl | undefined,
  voiceYou : undefined as Howl | undefined,
  voiceFight : undefined as Howl | undefined,
  voiceWin : undefined as Howl | undefined,
  voiceLose : undefined as Howl | undefined,
  clunkClick : undefined as Howl | undefined,
  evilSpin : undefined as Howl | undefined
  //animationResources: [] as any
};
export default assets;
