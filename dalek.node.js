exports.Dalek = (function dalekMaker(global){
    var method, collection=[];
    id=0;
    function findem(){
        var arr =[];
        for(var key in global){
            //console.log(key)
            if(key.indexOf('dalek') > -1){
                arr.push(key);
                //c.helpful(key);
            }
        }
        return arr;
    }
    function finder(){
        return new findem();
    }
    global.findDaleks = global.findDaleks || findem;
    function devNull(){ return null;}
    function expectedThis(func){
        var map = {
            document : ['querySelector'],
            console : ['log', 'error', 'warn'],
        }
        for(var key in map){
            for(var i=0; i<map[key].length; i++){
                method = map[key][i];
                if(global[key][method] == func){
                    return global[key];
                }
            }
        }
        if(typeof global[func.name] == 'function'){
            return global;
            for(var n in global){
                if(global[n][func.name] == func){
                    return global[n];
                }
            }
        }
        return null;
    }

    function extend(obj1, obj2, overwrite, maxLevel, level){
        maxLevel = maxLevel || 10;
        level = level || 1;
        for(var key in obj2){
            if(!obj1[key] || overwrite){
                obj1[key] = obj2[key];
                if(typeof obj2[key] == 'object' && level <= maxLevel){
                    level++;
                    extend(obj1[key], obj2[key], overwrite, maxLevel, level);
                }
            }
        }
    }
    if(global.Dalek){
        return global.Dalek;
    } else {
        
        console = global.console || {
            error : devNull,
            log : devNull,
            info : devNull,
            dir : devNull
        };

        global.expectedThis = (function eThisConstructor(global){
            
            if(global.expectedThis){
                return global.expectedThis;
            } else {
                
                return expectedThis;
            }
        })(global);

        global.extend = (function eConstructor(global){
            if(global.extend){
                return global.extend;
            } else {
             
             return extend;
            }

        })(global);

        function Dalek(arg1, errorCallback, lg){
            var c = {
                error   : this.logLevel > 0 ? console.error.bind(global.console) : devNull,
                warn    : this.logLevel > 1 ? console.warn.bind(global.console)  : devNull,
                log     : this.logLevel > 2 ? console.log.bind(global.console)   : devNull,
                dir     : this.logLevel > 2 ? console.dir.bind(global.console)   : devNull,
                info    : this.logLevel > 3 ? console.info.bind(global.console)  : devNull,
                helpful : this.logLevel > 4 ? console.log.bind(global.console)   : devNull,
                verbose : this.logLevel > 5 ? console.log.bind(global.console)   : devNull,
                bored   : this.logLevel > 6 ? console.log.bind(global.console)   : devNull
            }
            var intervals =[],
                timeouts=[],
                properties,
                that = this;
            this.running = new findem();
            
            
            this.id=generateID();
            this.logLevel=typeof lg == 'number' ? lg : 0;

            
            
            
            this.halt = function(){
                if(intervals)
                    for(var i=0;i<intervals.length;i++)
                        clearInterval(intervals[i]);
                if(timeouts)
                    for(i=0;i<timeouts.length;i++)
                        clearTimeout(timeouts[i]);
                //that = {};
                delete that;
                delete this;

            };
            function generateID(){
                //var counter = 0;
                if(typeof that.id == 'number' && typeof global['dalek' + that.id] == 'undefined' && that.id >1){
                    c.warn('keeping id');
                    c.log(that.id);
                    return that.id;
                }

                do{
                    if(id+200 > Number.MAX_SAFE_INTEGER){
                        id=0;
                    }
                    id+=Math.ceil(Math.random()*1000);
                }while(collection[id]);
                if(global['dalek' + id]){
                    generateID();
                } else {
                    c.warn('setting id');
                    c.log(id);
                    collection[id]=that;
                    return id;
                }
                
            }
            function makePublic(id){
                global['dalek' + id] =that;
            }
            function makePrivate(id){
                delete global['dalek' + id];
            };

            //var valid = false;
            if(typeof arg1 == 'object'){
                global.extend(this,arg1);
            }
            
            c.bored('71:exterminate');

            if(typeof arg1 == 'function' && typeof errorCallback == 'function'){
                //valid = true;
                stack = [];
                function g(c){
                    var a = [];
                    for(var i=0;i<stack.length; i++)
                        a[i]=stack[i];
                    if(typeof c == 'function')
                        c(a)
                    return a;
                }
                this.stack={functions : g()};
                this.stack.push = function(f,c){
                    if(typeof f == 'function')
                        stack.push(f);
                    if(typeof c == 'function'){
                        c();
                    }
                    that.stack.functions = g();
                }
                this.stack.clear = function(){stack=[]}
                this.stack.insert = function(i,f){
                    var a1,a2;
                    if(typeof f =='function'){
                        a1 = stack.slice(0,i);
                        a2 = stack.slice(i);
                        stack=Array.prototype.concat(a1,[f],a2);
                    }
                }
                this.stack.replace = function(a,b){
                    var i
                    if(typeof a == 'function')
                        i = stack.indexOf(a);
                    else if (typeof a == 'number' && a<stack.length && a %1 ==0)
                    {
                        if(a<0 && stack.length + a >= 0){
                            i=stack.length + a
                        } else
                            i=a;
                    } else
                        i=-1;

                    if(i>-1 && typeof b == 'function'){
                        stack[i]=b;
                    } else if(typeof a == 'function'){
                        c.helpful("couldn't find" + a.name +" it, boss");
                    } else if(typeof a == 'number'){
                        if(a>stack.length){
                            c.helpful(a + 'is too big');
                            c.bored('moneky');
                        } else {
                            c.helpful("can't parse non-integers")
                            c.bored("What are you some kind of joker?");
                        }
                    }
                }
                this.stack.get = g.bind(that);
                var exterminated = false;
                var argArray =[];

                this.exterminate = function(args){
                    that.id = generateID();
                    makePublic(that.id);
                    var e, f;
                    var a = args || that.arguments
                    if(!(a instanceof Array) && a){
                        a=[a]
                    } 
                    //a.unshift(counter);
                    if(stack.length>0){
                        exterminated = true;
                        f=stack.shift();
                        that.functions=g();
                        t=global.expectedThis(f)||that;
                        try{f.apply(t,a);}catch(e){that.error.apply(t,e,a)}
                        that.exterminate(a)
                    } else if(exterminated){
                        exterminated = false;
                        makePrivate(that.id);
                        timeouts.push(setTimeout(that.success.call(that),1));
                        
                    }
                    return that;
                }

                this.success = function(){
                    
                    arg1.apply(this,[this,arguments]);
                };
                this.next = function(func){
                    if(typeof func == 'function'){
                        var e = global.expectedThis(func) || that;
                        that.success=func.bind(e, Array.prototype.slice.call(arguments,1))
                    }
                }
                this.error = function(){
                    errorCallback.apply(this,[this,arguments]);
                };
                function run(func, e, args){
                    var expectedThis = e || that.expectedThis || global.expectedThis(func) || that;
                    var a = args || that.arguments
                    if(!(a instanceof Array) && a){
                        a=[a]
                    }

                    if(typeof func == 'function'){
                        var func2 = function(){
                            that.id = generateID();
                            makePublic(that.id);

                            that.results = setTimeout(function(){
                                that.results = func.apply(expectedThis,a);
                                that.success(that.results);
                                makePrivate(that.id);
                            },10000);
                            
                            //return that;

                        };
                        try{
                            setTimeout(func2,1); 
                            return that;
                        }catch(e){
                            that.error.apply(that,e,a)
                        }
                    } else {
                        c.error('Cannot run %O. %O is not a function', func, func);
                        that.error.apply(that,new Error('invalid function'),a);
                    }
                }

                this.run = run;

                return this;
            }
            this.success = this.success || devNull;
            this.error = this.error || devNull; 
            
            return this;

        }
        return Dalek;
    }
})(global);