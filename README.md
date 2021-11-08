# couch-extensions

## Installation

`npm i couch-extensions --save`

## What is this?
couch-extensions is a collection of common logic used with strings and arrays. 

## Why use this?
This package aims to reduce the amount of wet code being written. This packages tacks some usefull pointers from Linq extention methods  
for IEnummerable in dot net to add to the functionality of arrays and strings.

## Uses

### Adding to project
this package uses global declarations and only needs to be referenced once in the project, idealy at the root.

```
    import "couch-extensions";
```

## Array

### all(func: function)
Array.prototype.all takes a lambda as a parameter to check if all items in an array match the criteria.  
  
return type: boolean
  

Example
```
    const arr = [{id: 1, type: "dog"}, {id: 2, type: "dog"}];
    arr.all(x => x.type === "dog") //expected output: true
    arr.all(x => x.id === 1) //expected output: false
```

### any(func?: function)
Array.prototype.any can opperate with or without a lambda passed as a parameter. If no parameter is passed it will check if  
there are any items in the array  
  
return type: boolean
  
Example
```
    const arr = [1,2,3];
    arr.any() //expected output: true

    const emptyArr = [];
    emptyArr.any() //expected output: false
```
  
If a lambda is passed as a parameter, then 'any' will check if there are any items in the array that match the critera.  
  
Example  
```
     const arr = [{id: 1, type: "dog"}, {id: 2, type: "dog"}];
     arr.any(x => x.id === 1) //expected output: true
     arr.any(x => x.id === 5) //expected output: false
     arr.any(x => x.type === "dog") //expected output: true
```

### count()
Array.prototype.count can be called to get the number of items in an array. this is equivalent to x.length + 1.  
  
return type: number
  
Example
```
    const arr = [{id: 1, type: "dog"}, {id: 2, type: "dog"}];
    arr.count() //expected output: 2
```

### first()
Array.prototype.first will return the first element in an array.  
  
return type: T

Example
```
    const arr = [1,2,3]
    arr.first() //expected output: 1
```

### isEmpty()
Array.prototype.isEmpty will return a boolean that indicates if the array has any items or not.  
  
return type: boolean
  
Example
```
    const arr = [1,2,3];
    const emptyArr = [];
    arr.isEmpty() //expected output: false
    emptyArr.isEmpty() //expected output: true
```

### prepend(item: T)
Array.prototype.prepend will add an item passed as a parameter to the beginning of the array it was called on. This extention will maniputate the original array.
  
return type: void
  
Example
```
    const arr = [{id: 1, type: "dog"}, {id: 2, type: "dog"}];
    arr.prepend({id: 0, type: "cat"}) //expected result: [{id: 0, type: "cat"},{id: 1, type: "dog"}, {id: 2, type: "dog"}]
```

### single(func: function)
Array.prototype.single takes a lambda as a parameter to return a single item in the array that matches the provided criteria  
  
return type: T
  
Example
```
    const arr = [{id: 1, type: "dog"}, {id: 2, type: "dog"}];
    arr.single(x => x.id === 1) //expected output: {id: 1, type: "dog"}
    arr.single(x => x.type === "dog") //expected output: ERROR: Array contains more than one item matching the provided criteria

```

### sortByKey(key: string)
Array.prototype.sortByKey takes a string parameter "key" and sorts the array of objects by the provided key.  

return type: void

Example
```
    cosnt arr = [
        {id: 3, name: "bob", createdOn: "2014-05-16"},
        {id: 1, name: "john", createdOn: "2006-10-24"},
        {id: 2, name: "alex", createdOn: "2021-03-07"}
    ];

    arr.sortByKey("name") 
    //expected result: [
        {id: 2, name: "alex", createdOn: "2021-03-07"},
        {id: 3, name: "bob", createdOn: "2014-05-16"},
        {id: 1, name: "john", createdOn: "2006-10-24"}
    ];

    arr.sortByKey("id") 
    //expected result: [
        {id: 1, name: "john", createdOn: "2006-10-24"},
        {id: 2, name: "alex", createdOn: "2021-03-07"},
        {id: 3, name: "bob", createdOn: "2014-05-16"}
    ];

    arr.sortByKey("createdOn")
    //expected result: [
        {id: 1, name: "john", createdOn: "2006-10-24"},
        {id: 3, name: "bob", createdOn: "2014-05-16"},
        {id: 2, name: "alex", createdOn: "2021-03-07"}
    ];
```

## String

### isEmpty()
String.prototype.isEmpty will return a boolean that indicates if the string has any charachters or not.
  
return type: boolean
  
Example
```
    cosnt str = "the quick brown fox";
    const emptyStr = "";
    
    srt.isEmpty() //expected output: false
    emptyStr.isEmpty() //expected output: true
```

### first()
String.prototype.first returns the first character of the string
  
return type: string
  
Example
```
    const str = "the quick brown fox";
    srt.first() //expected output: t
```

### removeWhiteSpace()
String.prototype.removeWhiteSpace removes all white space from a string. this is similar to trim, however trim removes  
white space only from the beginning and end of the string.
  
return type: string
  
Example
```
    const str = " a b c ";
    str.trim() //expected output: "a b c"
    srt.removeWhiteSpace() //expected output: "abc";
```

### tryParse<T>(outCallBack?: (value: T) => T)
String.prototype.tryParse will attempt to parse a json string. If the string is parseable "tryParse" will return true, if not then false. "tryParse" takes an optional parameter "outCallBack" that is a lambda used to asign the parsed object to a  local variable.
  
 return type: boolean
  
Example
```
    interface IAnimal {
        id: number,
        type: string
    }
    cosnt jsonStr = '{"id": 1, "type": "dog"}';
    jsonStr.tryParse<IAnimal>() //expected output: true
    
    
    var parsedObj: IAnimal;
    if(json.tryParse<IAnimal>(x => parsedObj = x)){ // expected output: true; parsedObj = {id: 1, type: "dog"}
        //do something with parsedObj now that it has been assigned
    }
```



