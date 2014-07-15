Dalek
=====

Dalek "Promise" Library

This library is here to exterminate a stack, or propagate an asynchronous promise.

It doesn't care about your humanity, it gets things done.

How to Use?
===========

First, include dalek.min.js in your web page or node project.

For the web:
<script src='path/to/dalek.min.js'></script>

For Node.js:

    var Dalek = require('./path/to/dalek.node.js');
    
Second, create a new dalek:

  var robbie = new Dalek();

That's it.

Now you have a promise bot. 

Details
=======
The constructor accepts two arguments, in the style of jQuery, either the first argument can be an object, or you can pass it two functions.

Case 1:

    function error(){
        console.log("EXTERMINATE!");
    }
    function success(){
        console.log("EXTERMINATE!!");
    }
    var robbie = new Dalek(succes,error);
    
In this case, our very expressive Dalek will log "EXTERMINATE!!" if he resolves successfully, or "EXTERMINATE!" if he were to fail.

Case 2:

    var options = {
        success : function(){console.log("EXTERMINATE"),
        error : function(){console.log("EXTERMINATE! EXTERMINATE!")}
    };
    
    var robbie = new Dalek(options);

As adorable as this little go-getter is, we now have a promise handler that will be ready to do your horrible bidding.

API Overview
============
Since I wasn't allowed to equip them with death rays, every Dalek supports a few new features

* run
* stack
* exterminate (runs through the stack)
* and much much more...

(also supplies an 'extend' and 'expectedThis' shim)
