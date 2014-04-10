function GameObject(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    // mouse parameter holds the mouse coordinates
    this.handleClick = function(mouse){
        
        // perform hit test between bounding box 
        // and mouse coordinates

        if (this.x < mouse.x &&
            this.x + this.width > mouse.x &&
            this.y < mouse.y &&
            this.y + this.height > mouse.y) {

            // hit test succeeded, handle the click event!
            return true;
        }
        
        // hit test did not succeed
        return false;
    }
}

function Sprite(){

}