class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.plane = new MyPlane(scene, 20);
        
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.heightmap = new CGFtexture(this.scene, "textures/new_heightmap.jpg");
        this.texture = new CGFtexture(this.scene, "textures/terrain.jpg");

        this.shader.setUniformsValues({ uSamplerV : 1 });
        this.shader.setUniformsValues({ uSamplerF : 2 });
    }

    display = () => {
        this.scene.setActiveShader(this.shader);
        this.heightmap.bind(1);
        this.texture.bind(2);

        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.scale(50, 50, 8);
            this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}