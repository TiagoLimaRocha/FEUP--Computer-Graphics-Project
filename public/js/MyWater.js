class MyWater extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(scene, 50);

        this.shader = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");
        this.texture = new CGFtexture(this.scene, "textures/waterTex.jpg");
        this.heightmap = new CGFtexture(this.scene, "textures/waterMap.jpg");
        
        this.shader.setUniformsValues({
            uSamplerV: 1
        });
        this.shader.setUniformsValues({
            uSamplerF: 2
        });
    }

    update = (t) => {
        this.shader.setUniformsValues({
            timeFactor: t / 100 % 1000,
        });
    }

    display = () => {
        this.scene.setActiveShader(this.shader);
        this.heightmap.bind(1);
        this.texture.bind(2);

        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.scale(25, 25, 25);
            this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}