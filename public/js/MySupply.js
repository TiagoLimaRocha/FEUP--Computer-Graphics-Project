class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);

        // this.state = SupplyStates.INACTIVE;
        this.state = {
            INACTIVE: true,
            FALLING: false,
            LANDED: false
        };

        this.x = 0; 
        this.y = 9; 
        this.z = 0;
        
        this.prevUpdate = 0;

        this.box = new MyBox(scene);
        this.openBox = new MyBoxOpen(scene);
    }

    update = (t) => {
        if (this.prevUpdate === 0) 
            this.prevUpdate = t;
        
        let elapsed = t - this.prevUpdate;
        this.prevUpdate = t;

        if (this.state.FALLING) {
            this.y -= elapsed * (8.9 / 3000.0);
            
            if (this.y <= 0.1) 
                this.land();
        }
    }

    drop = (x, z) => {
        this.state.INACTIVE = false;
        this.state.FALLING = true;

        this.x = x;
        this.z = z;
    }

    land = () => {
        this.y = 0.1;

        this.state.FALLING = false;
        this.state.LANDED = true;
    }

    reset = () => {
        this.y = 9;
        this.prevUpdate = 0;
        
        this.state.INACTIVE = true;
        this.state.FALLING = false;
        this.state.LANDED = false;
    }

    display() {
        if (!this.state.INACTIVE) {
            this.scene.pushMatrix();
                this.scene.translate(this.x, this.y, this.z);
               
                if (this.state.FALLING) 
                    this.box.display();
                else 
                    this.openBox.display();
            
            this.scene.popMatrix();
        }
    }
}
