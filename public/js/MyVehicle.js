class MyVehicle extends CGFobject {
    constructor(scene) {
		super(scene);
        
        this.sphere = new MySphere(scene, 20, 20);
        this.semisphere = new MySemiSphere(scene, 10, 20);
        this.cylinder = new MyCylinder(scene, 30);
        this.rudder = new MyRudder(scene);
        this.propeller = new MyPropeller(scene);
        this.flag = new MyPlane(scene, 20);
        this.thread = new MyUnitCubeQuad(scene);

        this.theta = 0;
        this.speed = 0;
        
        this.x = 0; 
        this.y = 0; 
        this.z = 0;

        this.direction = 0;
        this.beta = 0;

        this.autoPilot = false;
        this.XCentre = 0;
        this.ZCentre = 0;

        this.prevUpdate = 0;

        this.initMaterials();
    }

    initMaterials = () => {

        // Blimp
        this.body = new CGFappearance(this.scene);
        this.body.setAmbient(0.7,0.7,0.7,1);
        this.body.setDiffuse(0.9,0.9,0.9,1);
        this.body.setShininess(10);
        this.body.loadTexture('textures/blimp/balloon.png');
        this.body.setTextureWrap('REPEAT','REPEAT');
        
        this.cockpit = new CGFappearance(this.scene);
        this.cockpit.setAmbient(0.7,0.7,0.7,1);
        this.cockpit.setDiffuse(0.9,0.9,0.9,1);
        this.cockpit.setShininess(10);
        this.cockpit.loadTexture('textures/blimp/cockpit_window.png');
        this.cockpit.setTextureWrap('REPEAT','REPEAT');

        this.gondole = new CGFappearance(this.scene);
        this.gondole.setAmbient(0.7,0.7,0.7,1);
        this.gondole.setDiffuse(0.9,0.9,0.9,1);
        this.gondole.setShininess(10);
        this.gondole.loadTexture('textures/blimp/cockpit_body.png');
        this.gondole.setTextureWrap('REPEAT','REPEAT');

        // Flag
        this.flagTex = new CGFappearance(this.scene);
        this.flagTex.setAmbient(0.7, 0.7, 0.7, 1);
        this.flagTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.flagTex.setShininess(10);
        this.flagTex.loadTexture('textures/theflag.jpg');
        this.flagTex.setTextureWrap('REPEAT', 'REPEAT');

        this.flagShaR = new CGFshader(this.scene.gl, "shaders/flagR.vert", "shaders/flag.frag");
        this.flagShaR.setUniformsValues({ uSampler1: 3});
        this.flagShaR.setUniformsValues({ speed: this.speed });
        this.flagShaR.setUniformsValues({ timeFactor: this.prevUpdate });

        this.flagShaL = new CGFshader(this.scene.gl, "shaders/flagL.vert", "shaders/flag.frag");
        this.flagShaL.setUniformsValues({ uSampler1: 3 });
        this.flagShaL.setUniformsValues({ speed: this.speed });
        this.flagShaL.setUniformsValues({ timeFactor: this.prevUpdate });

        this.flagMap = new CGFtexture(this.scene, "textures/theflag.jpg");
    }

    degToRad = (deg) => {
        return deg * (Math.PI / 180);
    }
    
    toggleAutoPilot = () => {
        if (!this.autoPilot){

            this.autoPilot = true;
    
            var alpha = this.degToRad(this.theta + 90);
            
            this.XCentre = this.x + 5 * Math.sin(alpha);
            this.ZCentre = this.z + 5 * Math.cos(alpha);
        } else 
            this.autoPilot = false;
    }

    update = (t) => {
        if (this.prevUpdate == 0)
            this.prevUpdate = t;
        
        var elapsed = t - this.prevUpdate;
        this.prevUpdate = t;

        if (this.autoPilot) {
            this.x = -5 * Math.cos(this.degToRad(this.theta)) + this.XCentre;
            this.z = 5 * Math.sin(this.degToRad(this.theta)) + this.ZCentre;
            this.turn(360 * elapsed / 5000.0);
            this.beta = (this.beta + 20) % (Math.PI * 2);
        } else {      
            this.x += this.speed * Math.sin(this.degToRad(this.theta)) * (elapsed / 1000.0);
            this.z += this.speed * Math.cos(this.degToRad(this.theta)) * (elapsed / 1000.0);

            this.beta = (this.beta + this.speed) % (Math.PI * 2);
        }

        this.flagShaR.setUniformsValues({
            speed: this.speed
        });
        this.flagShaR.setUniformsValues({
            timeFactor: t / 1000 % 1000
        });
        this.flagShaL.setUniformsValues({
            speed: this.speed
        });
        this.flagShaL.setUniformsValues({
            timeFactor: t / 1000 % 1000
        });
    }

    turn = (angle) => {
        this.theta += angle;
        this.theta %= 360;
        this.direction = this.degToRad(-angle * 3);
    }

    accelerate = (accel) => {
        this.speed += accel;

        if (this.speed < 0) 
            this.speed = 0;
    }

    reset = () => {
        this.x = this.y = this.z = this.theta = this.speed = this.direction = this.beta = 0;
        this.autoPilot = false;
    }

    display = () => {
        this.scene.pushMatrix();
            this.scene.translate(this.x, this.y, this.z);
            this.scene.rotate(this.degToRad(this.theta), 0, 1, 0);

            // Body
            this.body.apply();
            this.scene.pushMatrix();
                this.scene.scale(0.5, 0.5, 1);
                this.sphere.display();
            this.scene.popMatrix();

            // Gondole
            this.gondole.apply();
            this.scene.pushMatrix();
                this.scene.translate(0, -0.5, 0);
                this.scene.scale(0.1, 0.1, 0.701);
                this.scene.translate(0, 0, -0.5);
                this.scene.rotate(this.degToRad(90), 1, 0, 0);
                this.cylinder.display();
            this.scene.popMatrix();

            // gondole
            this.cockpit.apply();
            this.scene.pushMatrix();
                this.scene.translate(0, -0.5, 0.35);
                this.scene.rotate(this.degToRad(180), 0, 1, 0);
                this.scene.scale(0.1, 0.1, 0.1);
                this.semisphere.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
                this.scene.translate(0, -0.5, -0.35);
                this.scene.scale(0.1, 0.1, 0.1);
                this.semisphere.display();
            this.scene.popMatrix();

            // Engines
            this.body.apply();
            this.scene.pushMatrix();
                this.scene.translate(0.1, -0.52, -0.35);
                this.scene.scale(0.05, 0.05, 0.1);
                this.sphere.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
                this.scene.translate(-0.1, -0.52, -0.35);
                this.scene.scale(0.05, 0.05, 0.1);
                this.sphere.display();
            this.scene.popMatrix();

            // Propellers
            this.scene.pushMatrix();
                this.scene.translate(-0.1, -0.52, -0.45);
                this.scene.scale(0.1, 0.1, 0.1);
                this.scene.rotate(this.beta, 0, 0, 1);
                this.propeller.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
                this.scene.translate(0.1, -0.52, -0.45);
                this.scene.scale(0.1, 0.1, 0.1);
                this.scene.rotate(this.beta, 0, 0, 1);
                this.propeller.display();
            this.scene.popMatrix();

            // Rudders - Vertical
            this.scene.pushMatrix();
                this.scene.translate(0, 1/3, -1);
                this.scene.rotate(this.direction, 0, 1, 0);
                this.rudder.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
                this.scene.translate(0, -1/3, -1);
                this.scene.rotate(this.direction, 0, 1, 0);
                this.rudder.display();
            this.scene.popMatrix();
            
            // Rudders - Horizontal
            this.scene.pushMatrix();
                this.scene.translate(1/3, 0, -1);
                this.scene.rotate(this.degToRad(90), 0, 0, 1);
                this.rudder.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
                this.scene.translate(-1/3, 0, -1);
                this.scene.rotate(this.degToRad(90), 0, 0, 1);
                this.rudder.display();
            this.scene.popMatrix();


            if (this.scene.displayFlag) {
                
                this.flagTex.apply();
                this.scene.pushMatrix();
                    this.scene.translate(0, 0.4, -1.5);
                    this.scene.scale(0.01, 0.01, 0.65);
                    this.thread.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(0, -0.4, -1.5);
                    this.scene.scale(0.01, 0.01, 0.65);
                    this.thread.display();
                this.scene.popMatrix();


                this.flagTex.apply();
                this.scene.setActiveShader(this.flagShaR);
                this.flagMap.bind(3);

                this.scene.pushMatrix();
                    this.scene.translate(0, 0, -2.8);
                    this.scene.scale(1, 1, 2);
                    this.scene.rotate(Math.PI/2, 0, -1, 0);
                    this.flag.display();
                    this.scene.setActiveShader(this.scene.defaultShader);

                    this.scene.setActiveShader(this.flagShaL);
                    this.flagMap.bind(3);
                    this.scene.rotate(Math.PI, 0, -1, 0);
                    this.flag.display();
                this.scene.popMatrix();

                this.scene.setActiveShader(this.scene.defaultShader);
            }

        this.scene.popMatrix();
    }
}