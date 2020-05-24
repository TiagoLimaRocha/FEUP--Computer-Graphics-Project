class MySemiSphere extends CGFobject {
 
  constructor(scene, slices, stacks) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;

    this.initBuffers();
  }

  initBuffers = () => {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let phi = 0;
    let theta = 0;
    let phiInc = Math.PI / this.latDivs;
    let thetaInc = (Math.PI) / this.longDivs;
    let latVertices = this.longDivs + 1;

    let texMapLon = 0;
    let texMapLonInc = 1 / this.longDivs;
    let texMapLat = 0;
    let texMapLatInc = 1 / this.latDivs;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      let sinPhi = Math.sin(phi);
      let cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      texMapLon = 0;
      
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        let x = Math.cos(theta) * sinPhi;
        let y = cosPhi;
        let z = Math.sin(-theta) * sinPhi;
        this.vertices.push(x, y, z);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          let current = latitude * latVertices + longitude;
          let next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        // To be done... 
        // May need some additional code also in the beginning of the function.
        
        this.texCoords.push(texMapLon, texMapLat);

        texMapLon += texMapLonInc;
      }
      
      phi += phiInc;
      texMapLat += texMapLatInc;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
