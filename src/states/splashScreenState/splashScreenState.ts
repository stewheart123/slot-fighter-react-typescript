import { SplashScreenSequence } from "../splashScreenState/splashScreenSequence";

export class SplashScreenState {
    
    splashScreenSequence = new SplashScreenSequence();
    
    public startSequence() :void {
        this.splashScreenSequence.initialiseSequence();
    }
}