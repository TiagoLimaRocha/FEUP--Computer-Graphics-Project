/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
        super(scene);

        this.initMaterials();
        this.quad = new MyQuad(scene);
    }

    initMaterials = () => {
        this.topMat = new CGFappearance(this.scene);
        this.topMat.setAmbient(0.9, 0.9, 0.9, 1);
        this.topMat.setDiffuse(0.0, 0.0, 0.0, 1);
        this.topMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.topMat.setShininess(10.0);
        this.topMat.setTextureWrap('REPEAT', 'REPEAT');

        this.botMat = new CGFappearance(this.scene);
        this.botMat.setAmbient(0.9, 0.9, 0.9, 1);
        this.botMat.setDiffuse(0.0, 0.0, 0.0, 1);
        this.botMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.botMat.setShininess(10.0);
        this.botMat.setTextureWrap('REPEAT', 'REPEAT');

        this.frtMat = new CGFappearance(this.scene);
        this.frtMat.setAmbient(0.9, 0.9, 0.9, 1);
        this.frtMat.setDiffuse(0.0, 0.0, 0.0, 1);
        this.frtMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.frtMat.setShininess(10.0);
        this.frtMat.setTextureWrap('REPEAT', 'REPEAT');

        this.backMat = new CGFappearance(this.scene);
        this.backMat.setAmbient(0.9, 0.9, 0.9, 1);
        this.backMat.setDiffuse(0.0, 0.0, 0.0, 1);
        this.backMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.backMat.setShininess(10.0);
        this.backMat.setTextureWrap('REPEAT', 'REPEAT');

        this.leftMat = new CGFappearance(this.scene);
        this.leftMat.setAmbient(0.9, 0.9, 0.9, 1);
        this.leftMat.setDiffuse(0.0, 0.0, 0.0, 1);
        this.leftMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.leftMat.setShininess(10.0);
        this.leftMat.setTextureWrap('REPEAT', 'REPEAT');

        this.rightMat = new CGFappearance(this.scene);
        this.rightMat.setAmbient(0.9, 0.9, 0.9, 1);
        this.rightMat.setDiffuse(0.0, 0.0, 0.0, 1);
        this.rightMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.rightMat.setShininess(10.0);
        this.rightMat.setTextureWrap('REPEAT', 'REPEAT');

        this.topMat.loadTexture('textures/split_cubemap_day/top.png');
        this.botMat.loadTexture('textures/split_cubemap_day/bottom.png');
        this.frtMat.loadTexture('textures/split_cubemap_day/front.png');
        this.backMat.loadTexture('textures/split_cubemap_day/back.png');
        this.leftMat.loadTexture('textures/split_cubemap_day/left.png');
        this.rightMat.loadTexture('textures/split_cubemap_day/right.png');
    }
    
    updateTexture = () => {

        if (this.scene.landscapeTexture == 0){
            
            this.topMat.loadTexture('textures/split_cubemap_day/top.png');
            this.botMat.loadTexture('textures/split_cubemap_day/bottom.png');
            this.frtMat.loadTexture('textures/split_cubemap_day/front.png');
            this.backMat.loadTexture('textures/split_cubemap_day/back.png');
            this.leftMat.loadTexture('textures/split_cubemap_day/left.png');
            this.rightMat.loadTexture('textures/split_cubemap_day/right.png');

        } else if (this.scene.landscapeTexture == 1) {
            this.topMat.loadTexture('textures/split_cubemap_night/top.png');
            this.botMat.loadTexture('textures/split_cubemap_night/bottom.png');
            this.frtMat.loadTexture('textures/split_cubemap_night/front.png');
            this.backMat.loadTexture('textures/split_cubemap_night/back.png');
            this.leftMat.loadTexture('textures/split_cubemap_night/left.png');
            this.rightMat.loadTexture('textures/split_cubemap_night/right.png');
        }
    }

    display = () => {
        this.scene.pushMatrix();
            this.scene.scale(50, 50, 50);

            // Front
            this.frtMat.apply(); 
                this.scene.pushMatrix();
                this.scene.translate(0, 0, -0.5);
                this.quad.display();
            this.scene.popMatrix();

            // Back
            this.backMat.apply(); 
                this.scene.pushMatrix();
                this.scene.translate(0, 0, 0.5);
                this.scene.rotate(Math.PI, 0, 1, 0);
                this.quad.display();
            this.scene.popMatrix();
        
            // Bottom
            this.botMat.apply(); 
                this.scene.pushMatrix();
                this.scene.translate(0, -0.5, 0);
                this.scene.rotate(-Math.PI/2, 1.0, 0, 0);
                this.quad.display();
            this.scene.popMatrix();
        
            // Top
            this.topMat.apply(); 
                this.scene.pushMatrix();
                this.scene.translate(0, 0.5, 0);
                this.scene.rotate(Math.PI/2, 1.0, 0, 0);
                this.quad.display();
            this.scene.popMatrix();
        
            // Left 
            this.leftMat.apply();
                this.scene.pushMatrix();
                this.scene.translate(-0.5, 0, 0);
                this.scene.rotate(Math.PI/2, 0.0, 1.0, 0);
                this.quad.display();
            this.scene.popMatrix();
            
            // Right 
            this.rightMat.apply();
                this.scene.pushMatrix();
                this.scene.translate(0.5, 0, 0);
                this.scene.rotate(-Math.PI/2, 0.0, 1.0, 0);
                this.quad.display();
            this.scene.popMatrix();
 
        this.scene.popMatrix();
    }
}

