# A Graphic
A web component suite for displaying and animating vector graphics. Allows vector graphics to be rendered to the HTML5 canvas using a declarative, SVG-inspired syntax..

This project is still a work in progress. I plan on finishing the animation features as soon as possible.

The goal is to be able to take something like this:
```
<a-graphic space="100x100" strokeWidth="2">
    <a-circle x="50" y="50" radius="10" fill="none" stroke="#00f"></a-circle>
    <a-rectangle x="0" y="0" width="100" height="100"></a-rectangle>
</a-graphic>
```
I'd like to have the ability to render it either on a canvas or an SVG and use special syntax to describe animations that could be triggered in JavaScript. For example, `<a-circle x="a50 b60" y="50" radius="a10 b20"></a-circle>` would define a circle that in state `a` is positioned at x: 50, y: 50 and has a radius of 10. When the state changes to `b` the circle would transition to x: 60, y: 50 and radius 20.
