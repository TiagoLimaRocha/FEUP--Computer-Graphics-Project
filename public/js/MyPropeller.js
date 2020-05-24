class MyPropeller extends CGFobject {
    constructor(scene) {
        super(scene);

        this.quad = new MyQuad2(scene);
        this.sphere = new MySphere(scene, 10, 10);

        this.initMaterials();
    }

    initMaterials = () => {
        this.bladeMaterial = new CGFappearance(this.scene);
        this.bladeMaterial.setAmbient(0.7,0.7,0.7,1);
        this.bladeMaterial.setDiffuse(0.9,0.9,0.9,1);
        this.bladeMaterial.setShininess(10);

        this.screwMaterial = new CGFappearance(this.scene);
        this.screwMaterial.setAmbient(0,0,0,1);
        this.screwMaterial.setDiffuse(0,0,0,1);
        this.screwMaterial.setShininess(10);

    }
    
    display = () => {
        this.screwMaterial.apply();
        this.scene.pushMatrix();
            this.scene.scale(0.1, 0.1, 0.02);
            this.sphere.display();
        this.scene.popMatrix();

        this.bladeMaterial.apply();
        this.scene.pushMatrix();
            this.scene.translate(0, Math.SQRT1_2/2, 0);
            this.scene.scale(0.5, 1, 1);
            this.scene.rotate(Math.PI/4, 0, 0, 1);
            this.scene.scale(0.5, 0.5, 1);
            this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
            this.scene.translate(0, -Math.SQRT1_2/2, 0);
            this.scene.scale(0.5, 1, 1);
            this.scene.rotate(Math.PI/4, 0, 0, 1);
            this.scene.scale(0.5, 0.5, 1);
            this.quad.display();
        this.scene.popMatrix();
    }
}