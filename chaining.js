/* 
 * Chaining pattern example.
 * Methods return "this", pointing to the object so you can continue calling
 * other methods, one after each other.
 */

var Canvas = {
    version: '2.1',
    log: function(message) {
        console.log('[ CANVAS ]--> ' + message);
    },
    drawn: [],

    /**
     * Note that methods inside "draw" will return a reference to the "draw"
     * object and not to "Canvas". In this case this is desirable, because
     * we can continue drawing using less commands.
     * But, we will need a way to get back to the parent object in order
     * to continue chaining its methods.
     */
    draw: {
        line: function() {
            Canvas.log('draw line');
            Canvas.drawn.push('line');
            return this;
        },
        circle: function() {
            Canvas.log('draw circle');
            Canvas.drawn.push('circle');
            return this;
        },
        square: function() {
            Canvas.log('draw square');
            Canvas.drawn.push('square');
            return this;
        },

        /**
         * This method is used to go a level up in the hierarchy, returning
         * the Canvas object directly. This is what makes it possible to
         * continue chaining calls in the Canvas object.
         * 
         * @returns {Canvas}
         */
        done: function() {
            return Canvas;
        }
    },
    clear: function() {
        Canvas.log('clear canvas');
        Canvas.drawn = [];
        return this;
    },
    save: function() {
        Canvas.log('save canvas');
        return this;
    }
};

//------------------------------------------------------------------------------

//test
Canvas.draw
    .line()
    .circle()
    .square()
    .done()
.save()
.clear();

//see what happened to drawn contents
console.log( Canvas.drawn );
