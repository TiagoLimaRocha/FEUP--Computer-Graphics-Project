const MAX_SUPPLIES = 5;

/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init = (application) => {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.incompleteSphere = new MySphere(this, 16, 8);
        this.unitCylinder = new MyCylinder(this, 200);
        this.cubeMap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this);
        this.billboard = new MyBillboard(this);
        // this.water = new MyWater(this);
        
        this.supplies = [];
        this.supplyID = 0;
        this.nSuppliesDelivered = 0;
        
        for (var i = 0; i < MAX_SUPPLIES; i++) 
            this.supplies.push(new MySupply(this));
        
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.landscapeTexture = 0;
        this.displayFlag = true;
        this.displayBillboard = true;

        this.initTextures();

        this.cooldown = 0;
    }

    initTextures = () => {
        this.textures = [
            new CGFtexture(this, 'textures/earth.jpg')
        ];

        this.textureList = {
            'Earth': 0
        };

        this.landscapes = {
            'Day': 0,
            'Night': 1
        };

    }

    initLights = () => {
        this.setGlobalAmbientLight(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(30, 40, 5, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();
        this.lights[1].update();

        this.lights[2].setPosition(-30, -40, 5, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].enable();
        this.lights[2].update();
    }

    initCameras = () => this.camera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(20, 20, 45), vec3.fromValues(0, 0, 0));
    
    setDefaultAppearance = () => {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    handleKeyPress = () => {
        var log = "Key pressed: ";
        var keysWerePressed = false;

        this.match(true)
            .on(x => this.gui.keyWasPressed("KeyW") === x, () => {
                log += "W";

                if (!this.vehicle.autoPilot)
                    this.vehicle.accelerate(.2 * this.speedFactor);

                keysWerePressed = true;
            })
            .on(x => this.gui.keyWasPressed("KeyS") === x, () => {
                log += "S";

                if (!this.vehicle.autoPilot)
                    this.vehicle.accelerate(-.2 * this.speedFactor);

                keysWerePressed = true;
            })
            .on(x => this.gui.keyWasPressed("KeyA") === x, () => {
                log += "A"

                if (!this.vehicle.autoPilot)
                    this.vehicle.turn(5);

                keysWerePressed = true;
            })
            .on(x => this.gui.keyWasPressed("KeyD") === x, () => {
                log += "D"

                if (!this.vehicle.autoPilot)
                    this.vehicle.turn(-5);

                keysWerePressed = true;
            })
            .on(x => this.gui.keyWasPressed("KeyR") === x, () => {
                log += "R"

                this.vehicle.reset();

                for (let supply of this.supplies)
                    supply.reset();

                this.supplyID = 0;
                this.billboard.reset();

                keysWerePressed = true;
            })
            .on(x => this.gui.keyWasPressed("KeyP") === x, () => {
                log += "P"

                this.vehicle.toggleAutoPilot();

                keysWerePressed = true;
            })
            .on(x => this.gui.keyWasPressed("KeyL") === x, () => {
                log += "L"

                this.cooldown = 15;

                if (this.supplyID < this.supplies.length) {
                    this.supplies[this.supplyID].drop(this.vehicle.x, this.vehicle.z);
                    
                    this.supplyID++;
                    this.nSuppliesDelivered = this.supplyID;
                    this.billboard.update();
                }

                keysWerePressed = true;
            })

        if (keysWerePressed)     
            console.log(log);
        else if (!this.vehicle.autoPilot) 
            this.vehicle.turn(0);
    }

    updateLandscape = () => this.cubeMap.updateTexture();

    // called periodically (as per setUpdatePeriod() in init())
    update = (t) => {
        // this.water.update(t);

        if (this.cooldown > 0) 
            this.cooldown--; 

        this.handleKeyPress();
        this.vehicle.update(t);

        for (let supply of this.supplies)
            supply.update(t);
    }

    display = () => {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis) 
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        
        this.pushMatrix();
            this.translate(0, 10, 0);
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.vehicle.display();
        this.popMatrix();

        this.terrain.display();
        // this.water.display();

        for (let supply of this.supplies) 
            supply.display();

        this.cubeMap.display();

        if (this.displayBillboard)
            this.billboard.display();
        // ---- END Primitive drawing section
    }

    // Pretty Conditionals 
    match = x => ({
        on: (pred, fn) => (pred(x) ? this.matched(fn(x)) : this.match(x)),
        otherwise: fn => fn(x)
    })

    matched = fn => ({
        on: () => this.matched(fn),
        otherwise: () => fn
    })
}