/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init = (application) => {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayFlag').name('Display Flag');
        this.gui.add(this.scene, 'displayBillboard').name('Display Billboard');
        //Sliders
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        //Selectors
        this.gui.add(this.scene, 'landscapeTexture', this.scene.landscapes).name('Landscape').onChange(this.scene.updateLandscape.bind(this.scene));

        this.initKeys(); 

        return true;
    }

    initKeys = () => {
        this.scene.gui = this;
        this.processKeyboard = function () {};
        this.activeKeys = {};
    }

    processKeyDown = (e) => this.activeKeys[e.code] = true;

    processKeyUp = (e) => this.activeKeys[e.code] = false;

    keyWasPressed = (scancode) => this.activeKeys[scancode] || false;
}