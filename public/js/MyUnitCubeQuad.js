class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initMaterials();
        
        this.front = new MyQuad(this.scene);
        this.back = new MyQuad(this.scene);
        this.bottom = new MyQuad(this.scene);
        this.top = new MyQuad(this.scene);
        this.left = new MyQuad(this.scene);
        this.right = new MyQuad(this.scene);
    }

    initMaterials = () => {
        this.sideMaterial = new CGFappearance(this.scene);
        this.sideMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.sideMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sideMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.sideMaterial.setShininess(10.0);
        this.sideMaterial.loadTexture('textures/wood.jpg');
        this.sideMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.topMaterial = new CGFappearance(this.scene);
        this.topMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.topMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.topMaterial.setShininess(10.0);
        this.topMaterial.loadTexture('textures/wood.jpg');
        this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.bottomMaterial = new CGFappearance(this.scene);
        this.bottomMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottomMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottomMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottomMaterial.setShininess(10.0);
        this.bottomMaterial.loadTexture('textures/wood.jpg');
        this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display = () => {

        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.5);

            // Front
            this.sideMaterial.apply(); 
            this.scene.pushMatrix();
                this.scene.translate(0, 0, 0);
                this.front.display();
            this.scene.popMatrix();

            // Back
            this.sideMaterial.apply(); 
            this.scene.pushMatrix();
                this.scene.translate(0, 0, -1);
                this.scene.rotate(Math.PI, 0, 1.0, 0);
                this.back.display();
            this.scene.popMatrix();

            // Bottom
            this.bottomMaterial.apply(); 
            this.scene.pushMatrix();
                this.scene.translate(0, -0.5, -0.5);
                this.scene.rotate(Math.PI / 2, 1.0, 0, 0);
                this.bottom.display();
            this.scene.popMatrix();

            // Top
            this.topMaterial.apply(); 
            this.scene.pushMatrix();
                this.scene.translate(0, 0.5, -0.5);
                this.scene.rotate(-Math.PI / 2, 1.0, 0, 0);
                this.top.display();
            this.scene.popMatrix();

            // Left
            this.sideMaterial.apply(); 
            this.scene.pushMatrix();
                this.scene.translate(0.5, 0, -0.5);
                this.scene.rotate(Math.PI / 2, 0.0, 1.0, 0);
                this.left.display();
            this.scene.popMatrix();

            // Right
            this.sideMaterial.apply(); 
            this.scene.pushMatrix();
                this.scene.translate(-0.5, 0, -0.5);
                this.scene.rotate(-Math.PI / 2, 0.0, 1.0, 0);
                this.right.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
    }

    updateTexCoords = (coords) => {
        this.front.updateTexCoords(coords);
        this.back.updateTexCoords(coords);
        this.bottom.updateTexCoords(coords);
        this.top.updateTexCoords(coords);
        this.left.updateTexCoords(coords);
        this.right.updateTexCoords(coords);

    }
}