class MyCylinder extends CGFobject {
    
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;

        this.initBuffers();
    }

    initBuffers = () => {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        let theta = 0;
        let thetaInc = Math.PI * 2 / this.slices;

        let textMap = 0;
        let textMapInc = 1 / this.slices;


        for (let i = 0; i <= this.slices; i++) {
            let x = Math.cos(theta);
            let z = Math.sin(-theta);

            this.vertices.push(x, 0, z);
            this.vertices.push(x, 1, z);

            this.normals.push(x, 0, z, x, 0, z);
            
            this.texCoords.push(textMap, 1);
            this.texCoords.push(textMap, 0);

            if (i != 0) {
                this.indices.push((i * 2), (i * 2 + 1), (i * 2 - 1));
                this.indices.push((i * 2), (i * 2 - 1), (i * 2 - 2));
            }

            theta += thetaInc;
            textMap += textMapInc;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateSlices = (complexity) => {
        this.slices = complexity;

        this.initBuffers();
        this.initNormalVizBuffers();
    }
}