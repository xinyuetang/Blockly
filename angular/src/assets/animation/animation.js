var middleWidth = 260;

function gameOne(employee, letter, letterId) {

    // alert('middle width to location: ' + middleWidth);

    var letterPosition = { x: 0, y: 0 };
    var offsetY = letterId * 60;

    var employeeOne = commonTween({ x: 130, y: 200 }, { x: letterPosition.x, y: offsetY }, employee, 1000);
    var employeeTwo = commonTween({ x: letterPosition.x, y: offsetY }, { x: letterPosition.x+middleWidth-40, y: offsetY }, employee, 3000);
    var employeeThree = commonTween({ x: letterPosition.x+middleWidth, y: offsetY },{ x: 130, y: 200 }, employee, 1000);

    var letterOne = commonTween(letterPosition, { x: letterPosition.x+middleWidth, y: letterPosition.y }, letter, 3000);
    var letterTwo = commonTween({ x: letterPosition.x+middleWidth, y: letterPosition.y }, { x: letterPosition.x+middleWidth+100, y: letterPosition.y }, letter, 1000);

    employeeOne.onComplete(function(){
        employeeTwo.start();
        letterOne.start();
    });
    employeeTwo.onComplete(function(){
        letterTwo.start();
    });
    letterTwo.onComplete(function(){
        employeeThree.start();
    })
    employeeOne.start();
    return employeeThree;
}

function gameTwo(employee, letter0, letter1, letterId){

    // alert('middle width to location: ' + middleWidth);

    var offsetY = letterId * 60;
    var offsetsetY = letterId * 30;

    // 1
    var employeeOne = commonTween({ x: 130, y: 200 }, { x: 0, y: 0+offsetY }, employee, 1000);
    // 2
    var employeeTwo = commonTween({ x: 0, y: 0+offsetY }, { x: 100, y: 0 }, employee, 1000);
    var letter0One = commonTween({ x: 0, y: 0 }, { x: 220, y: 0-offsetY-offsetsetY }, letter0, 1000);
    // 3
    var employeeThree = commonTween({ x: 100, y: 0}, { x: 0, y: 30+offsetY }, employee, 1000);
    // 4
    var employeeFour = commonTween({ x: 0, y: 30+offsetY }, { x: middleWidth-40, y: 0+offsetY }, employee, 1000); 
    var letter1One = commonTween({ x: 0, y: 0 }, { x: middleWidth, y: -50 }, letter1, 1000);
    var letter1Two = commonTween({ x: middleWidth, y: -50 }, { x: middleWidth+100, y: -50 }, letter1, 1000);
    // 5
    var employeeFive = commonTween({ x: middleWidth-40, y: 0+offsetY }, { x: 160, y: 0-offsetsetY }, employee, 1000);
    // 6
    var employeeSix = commonTween({ x: 160, y: 0-offsetsetY }, { x: middleWidth-40, y: 30+offsetY }, employee, 1000);
    var letter0Two = commonTween({ x: 220, y: 0-offsetY-offsetsetY }, { x: middleWidth, y: 45 }, letter0, 1000);
    var letter0Three = commonTween({ x: middleWidth, y: 45 }, { x: middleWidth+100, y: 45 }, letter0, 1000);
    // 7
    var employeeSeven = commonTween({ x: middleWidth-40, y: 30+offsetY }, { x: 130, y: 200 }, employee, 1000);

    employeeOne.onComplete(function(){
        employeeTwo.start();
        letter0One.start();
    });
    employeeTwo.onComplete(function(){
        employeeThree.start();
    });
    employeeThree.onComplete(function(){
        employeeFour.start();
        letter1One.start();
    })
    employeeFour.onComplete(function(){
        letter1Two.start();
    })
    letter1Two.onComplete(function(){
        employeeFive.start();
    })
    employeeFive.onComplete(function(){
        employeeSix.start();
        letter0Two.start();
    })
    employeeSix.onComplete(function(){
        letter0Three.start();
    })
    letter0Three.onComplete(function(){
        employeeSeven.start();
    })
    employeeOne.start();
    return employeeSeven;
}

function commonTween(position, endPosition, object, time) {
    // 实现平滑的动画效果，在同一个循环动画中调用 TWEEN.update 方法
    // 调用 requestAnimationFrame 方法来获得良好的图像性能
    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }
    requestAnimationFrame(animate);
    // 创建tween对象
    var tween = new TWEEN.Tween(position)
    .to({
        x: endPosition.x,
        y: endPosition.y
    }, time)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function () {
        object.style.setProperty('transform', 'translate(' + position.x + 'px, ' + position.y + 'px)');
    });
    return tween;
}
