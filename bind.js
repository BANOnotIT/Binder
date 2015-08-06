/**
 * @copyright BANO.notIT
 * @version 0.0.2
 * key format- "f5|^%$"- ctrl + alt + shift + F5, "8" - 8, "8|%" - ctrl + 8, "space" - " "
 * + alt $
 * + ctrl %
 * + shift ^
 */
(function(lib){
    "use strict";
    document.addEventListener("keydown",function(e){
        var k= [e.keyCode,""],r;
        if(e.altKey) k[1] += "$";
        if(e.ctrlKey) k[1] += "%";
        if(e.shiftKey) k[1] += "^";
        k = k[1] !== "" ? k.join("|") : k[0];
        if((r=L.fns[k]))
            for(var i=0;i< r.length && (r[i].call(r[++i],e))!=="stop";++i){}
    });
    /**
     * @param {String}str
     */
    var L=lib.bind=function(str,fn,thisData){
        if(str==undefined) return false;
        str=L.valid(str);
        if(!str) throw Error("не валидная строка :(");
        !L.fns[str]&&(L.fns[str]=str=[])||(str= L.fns[str]);
        str.push(fn);
        str.push(thisData);
        return lib;
    };
    /**
     * @param {number|string}k
     * @param {function}f
     * @return {boolean}
     */
    lib.unbind=function(k,f){
        if(k===undefined|| typeof f!="function") throw Error("must be norm params");
        var i, k=L.valid(k);
        return !!((i = (L.fns[k]||[]).indexOf(f)) != -1 && L.fns[k].splice(i, 2));
    };
    /**
     * @param {number|string}s
     * @return {boolean|string}
     */
    L.valid=function(s){
        s=(""+s).trim().toUpperCase();
        if(!(/^[A-Z0-9]+(?:\|[%$^]{1,3})?$/.test(s))) return false;
        s= s.split("|",2);
        var r;
        s[0]= (r=L.keys[s[0]])!=undefined?r:s[0];
        s[1]&&(s[1]=[].slice.call(s[1]).sort().join(""));
        s= s.join("|");
        return s;
    };
    L.keys={
        ctrl:17,
        shift:16,
        alt:18,
        enter:13,
        backspace:8,
        space:32,
        slash:191,
        bslash:220,
        minus:189,
        dot:110,
        del:46,
        esc:27
    };
    for(var i=1; i<13;i++)// function keys
        L.keys["F"+i]=111+i;
    for(var i=0;i<10;i++)// numbers
        L.keys[i]=48+i;
    [].forEach.call("QWERTYUIOPASDFGHJKLZXCVBNM",function(a){// буквы
        L.keys[a]= a.charCodeAt(0);
    });
    Object.keys(L.keys).forEach(function(n){
        var a=this[n];
        delete this[n];
        this[n.toUpperCase()]=a;
    }, L.keys);
    L.fns={};
})(window.B=window.B||{});