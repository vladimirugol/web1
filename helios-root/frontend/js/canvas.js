

const graphDrawer = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
    R_PIXELS: 120, 

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error("Canvas element not found!");
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    },

    drawCanvas(rValue) {
        this.ctx.clearRect(0, 0, this.width, this.height); 
        this._drawArea(rValue);
        this._drawAxes();
        this._drawLabels(rValue);
    },


    drawPoint(x, y, r, isHit) {
        const scale = this.R_PIXELS / r;
        const pointX = this.centerX + x * scale;
        const pointY = this.centerY - y * scale; 

        this.ctx.fillStyle = isHit ? '#28a745' : '#dc3545'; 
        this.ctx.beginPath();
        this.ctx.arc(pointX, pointY, 4, 0, 2 * Math.PI);
        this.ctx.fill();
    },

    redrawAllPoints(history) {
        history.forEach(item => {
            const isHit = item.hit;
            this.drawPoint(parseFloat(item.x), parseFloat(item.y), parseFloat(item.r), isHit);
        });
    },

    drawPointsForCurrentR(history, currentR) {
        if (!currentR) return;
        
        history.forEach(item => {
            const isHit = item.hit;
            const scale = this.R_PIXELS / currentR;
            const pointX = this.centerX + parseFloat(item.x) * scale;
            const pointY = this.centerY - parseFloat(item.y) * scale;

            this.ctx.fillStyle = isHit ? '#28a745' : '#dc3545'; 
            this.ctx.beginPath();
            this.ctx.arc(pointX, pointY, 4, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    },
    
    _drawArea(rValue) {
        const r_px = this.R_PIXELS;
        const r_half_px = r_px / 2;
        
        this.ctx.fillStyle = '#e50074';
        this.ctx.beginPath();
        this.ctx.fillRect(this.centerX - r_half_px, this.centerY - r_px, r_half_px, r_px);
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + r_half_px, this.centerY);
        this.ctx.lineTo(this.centerX, this.centerY - r_px);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.arc(this.centerX, this.centerY, r_half_px, Math.PI/2, Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    },

    _drawAxes() {
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.centerY); this.ctx.lineTo(this.width, this.centerY);
        this.ctx.lineTo(this.width - 10, this.centerY - 5); this.ctx.moveTo(this.width, this.centerY);
        this.ctx.lineTo(this.width - 10, this.centerY + 5);
        this.ctx.moveTo(this.centerX, this.height); this.ctx.lineTo(this.centerX, 0);
        this.ctx.lineTo(this.centerX - 5, 10); this.ctx.moveTo(this.centerX, 0);
        this.ctx.lineTo(this.centerX + 5, 10);
        this.ctx.stroke();
    },
    
    _drawLabels(rValue) {
        if (!rValue) return; 
        this.ctx.fillStyle = 'black';
        this.ctx.font = '12px Arial';
        const labels = [-rValue, -rValue / 2, rValue / 2, rValue];
        const pixelSteps = [-this.R_PIXELS, -this.R_PIXELS / 2, this.R_PIXELS / 2, this.R_PIXELS];
        labels.forEach((label, i) => {
            const step = pixelSteps[i];
            this.ctx.fillText(label, this.centerX + step - 5, this.centerY + 15);
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX + step, this.centerY - 3);
            this.ctx.lineTo(this.centerX + step, this.centerY + 3);
            this.ctx.stroke();
            this.ctx.fillText(label, this.centerX + 10, this.centerY - step + 3);
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX - 3, this.centerY - step);
            this.ctx.lineTo(this.centerX + 3, this.centerY - step);
            this.ctx.stroke();
        });
        this.ctx.fillText("X", this.width - 15, this.centerY + 15);
        this.ctx.fillText("Y", this.centerX - 15, 15);
    }
};