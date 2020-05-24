class MyRudder extends CGFobject {
    constructor(scene) {
        super(scene);

        this.triangle = new MyTriangle(scene);
        this.quad = new MyQuad2(scene);

        this.initMaterials();
    }

    initMaterials = () => {
        this.triMat = new CGFappearance(this.scene);
        this.triMat.setAmbient(0.7,0.7,0.7,1);
        this.triMat.setDiffuse(0.9,0.9,0.9,1);
        this.triMat.setShininess(10);
        this.triMat.loadTexture('textures/blimp/fin_trig.png');
        this.triMat.setTextureWrap('REPEAT','REPEAT');

        this.quadMat = new CGFappearance(this.scene);
        this.quadMat.setAmbient(0.7,0.7,0.7,1);
        this.quadMat.setDiffuse(0.9,0.9,0.9,1);
        this.quadMat.setShininess(10);
        this.quadMat.loadTexture('textures/blimp/fin_quad.png');
        this.quadMat.setTextureWrap('REPEAT','REPEAT');
    }

    display() {
        this.scene.pushMatrix();
            this.scene.scale(1/3, 1/3, 1/3);

            this.triMat.apply();
            this.scene.pushMatrix();
                this.scene.translate(0, 0, 0.5);
                this.scene.scale(1, 1/Math.sqrt(8), 1/Math.sqrt(8));
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.scene.rotate(-Math.PI/4, 0, 0, 1);
                this.triangle.display();
            this.scene.popMatrix();

            this.quadMat.apply();
            this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.quad.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
    }
}