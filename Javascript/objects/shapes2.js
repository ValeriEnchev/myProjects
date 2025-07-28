
/*

ES6 Homework 13

*/

/* 
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Test_your_skills:_Object-oriented_JavaScript
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
https://doza.pro/art/math/geometry/bg/area-triangle
https://www.matematika.bg/geometry/area.html
*/


class Shape {
  name;
  sides;
  sideLength;
  constructor(name, sides, sideLength){
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }
  calcPerimeter() {
    const perimeter = this.sides * this.sideLength;
    console.log(`The perimeter of ${this.name} is equal to ${perimeter}`);
    return perimeter;
  }
}

// const square = new Shape('squere', 4, 5);
// square.calcPerimeter();

const triangle = new Shape('triangle', 3, 3);
triangle.calcPerimeter();

class Square extends Shape {
  constructor(sideLength){
    super('square', 4, sideLength);
  }
  calcArea(){
    const area = this.sideLength * this.sideLength;
    console.log(`The area of '${this.name}' is equal to ${area}`);
    return area;
  }
}

const square = new Square(5);
square.calcPerimeter();
square.calcArea();

class Figure extends Shape {
  //alpha;
  constructor(name, sides, sideLength){
    super (name, sides, sideLength);
    //this.alpha = (Math.PI - 2 * Math.PI/sides)/2;
  }

  calcArea(){
	/*  
    let area = this.sideLength * this.sideLength / 2;
    area *= Math.sin(this.alpha) * Math.sin(this.alpha) / Math.sin(Math.PI - 2 * this.alpha);
    area *= this.sides;
    */
    
	const area = this.sides * ( this.sideLength * this.sideLength / 4 ) * (1 / Math.tan(Math.PI / this.sides));
    console.log(`The area of ${this.name} is equal to ${Math.round(area * 100)/100}`);
    return area;
  }
  
  static getAlpha (sides, dim='rad') {
    const alpha = (Math.PI - 2 * Math.PI/sides)/2;
    if (dim === 'deg') {
      return 180/Math.PI * alpha;
    } else {
	  return alpha;
    }  
  }
    
  static getFullArea(...shapes){
    let fullArea = 0;
    let list = shapes;

    if (shapes[0][0] != null) list = shapes[0];
    for(const s of list){
      fullArea += s.calcArea();
    }
    return Math.round(fullArea * 100)/100;
  }
  static {
    console.log('Figure');
  }
}
let figures = [
  new Figure('triangle', 3, 5),
  new Square(5),
  new Figure('pentagon', 5, 5),
  new Figure('hexagon', 6, 5),
  new Figure('octagon', 8, 5)
];

for(const f of figures) {
  f.calcPerimeter();
  f.calcArea();
}

//console.log(figures);
// const figure3 = new Figure('triangle', 3, 5);
// figure3.calcPerimeter();
// figure3.calcArea();

// const figure4 = new Figure('square', 4, 5);
// figure4.calcPerimeter();
// figure4.calcArea();

// const figure5 = new Figure('pentagon', 5, 5);
// figure5.calcPerimeter();
// figure5.calcArea();

// const figure6 = new Figure('hexagon', 6, 5);
// figure6.calcPerimeter();
// figure6.calcArea();

// const figure8 = new Figure('octagon', 8, 5);
// figure8.calcPerimeter();
// figure8.calcArea();

// console.log(Figure.getAlpha(4));
console.log(Figure.getAlpha(4, 'deg'));
// console.log(Figure.getFullArea(figure3, figure4, figure8));
console.log(Figure.getFullArea(figures[0],figures[1]));
console.log(Figure.getFullArea(figures));

/*

"The perimeter of triangle is equal to 9"
"The perimeter of square is equal to 20"
"The area of 'square' is equal to 25"
"The perimeter of triangle is equal to 15"
"The area of triangle is equal to 10.83"
"The perimeter of square is equal to 20"
"The area of 'square' is equal to 25"
"The perimeter of pentagon is equal to 25"
"The area of pentagon is equal to 43.01"
"The perimeter of hexagon is equal to 30"
"The area of hexagon is equal to 64.95"
"The perimeter of octagon is equal to 40"
"The area of octagon is equal to 120.71"
45
"The area of triangle is equal to 10.83"
"The area of 'square' is equal to 25"
35.83
"The area of triangle is equal to 10.83"
"The area of 'square' is equal to 25"
"The area of pentagon is equal to 43.01"
"The area of hexagon is equal to 64.95"
"The area of octagon is equal to 120.71"
264.5

*/