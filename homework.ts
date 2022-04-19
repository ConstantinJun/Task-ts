// EX 1 -----------------------------------

interface Entity 
{
  readonly id?: string;
  readonly name?: string;
  readonly age?: number;
  readonly ethnicity?: string;
}


type A <T> ={
  -readonly [P in keyof T] : T[P]
}

type B <T> ={
  [P in keyof T] -? : T[P]
}

type C <T> = {
    [P in keyof T as Exclude<P,'id'|'ethnicity'>] : T[P]
}

type D <T> = {
    [P in keyof T] : boolean
}



type newType = A<B<C<D<Entity>>>>;
// Given following interface do the following operations:
// Remove - 1. readonly, 2. optional type and 3. id property & ethnicity property
// do this as 3 separate mutation types
// create a mapper function that maps response type of all keys to boolean

// expected:
// type newType = A<B<C<D<Type>>>>
/*
  {
    name: boolean;
    age: boolean;
  }
 */

// EX 2 ------------------------------------------------
/*
/*HW
1. Create an interface Id that has property id of type number
2. Create an interface Name that has property name of type string
3. Create a new type IdOrName and pass in a generic type
* If passed in type extends Id, IdOrName - will be of type number
* Else If passed in type extends Name, IdOrName - will be of type string
* Else passed in type extends Anything Else, IdOrName - will be of type {age: boolean}
 */

interface Id {
  id:number
}

interface Name{
  name:string
}

interface AnythingElse{
  class:string
}

type IdOrName <T>= T extends Id ? number: T extends Name? string:boolean;
type ex= IdOrName<Id>
type ex2 = IdOrName<Name>
type ex3 = IdOrName<AnythingElse>



// EX 3 ------------------------------------------------
/*
 Write a detailed explanation with images || steps || words how ex 5 withLet function works and why did we get the expected result

//  Ideea estenteala este in hoisting JS & Async Js.
//  1)Hoisting : 
//   - Unde comportamentul lui let se deosebeste de var:
//     a) "Var" are function scope si global scope, 
//     b) "let" este legat de scope context unde este declarat si initializat.
//  2)Async Js : 
//    - JS-ul in sine nu este async dar sync (Call-stack:  Since the call stack is single, function(s) execution, is done, one at a time, from top to bottom.
//     the last function that gets pushed into the stack is the first to be pop out, when the function returns. &&
//     When function is executed,create a local memory for this context of function and work with hims)
//    - Cu ajutor la EventLoop(verifica daca call-stack este empty pentru a arunca callbackfunction din MessageQueue) si MessageQueue||taskQueue (tine in sine callback function &&
//     First-In-First-Out)) avem posobilitiate la conceput de async.

//   Din aceste 2 idee putem face o concluzie ca executarea la "setTimeout()" la withVar() si withLet() va fi diferita:
//   1) withVar() :  va astepta finisarea la console.log() dupa va lucra cu variabila index care in local memory la withVar va fi egala cu 10 si se va repeta de 10 ori;
//   2) withVar() :  va astepta finisarea la console.log() dupa va lucra cu variabila index care deja este in contextul de scope la for statement si va fi 
//   indexul incrementat de fiecare data pina la 9;
    
  

// EX 4 ------------------------------------------------
//Having two interfaces:
/*interface User {
  id: number;
  name: string;
  age: number;
}

interface Car {
  id: number;
  color: string;
  numberOfDoors: number;
}
Replicate an API response that will have the following structure:

{
  data: {
    [any keys of string type]: Generic type;
    pagination: number;
  }
  errors: string[]
}
*/
interface User {
  id: number;
  name: string;
  age: number;
}

interface Car {
  id: number;
  color: string;
  numberOfDoors: number;
}

type ApiResponse<T> = {
  data: {
    [P in keyof T]: T[P]
  } & {pagination : number}
  errors: string[]
}

// EX 5 ------------------------------
// Write a class decorator, method decorator and parameter decorator functions for any Class the logic inside each decorator is up to you e.g.:
/*
@ClassDecorator
class SomeClass {

  @PropertyDecorator
  property1: string;

  @MethodDecorator(PASS_SOME_ENUM)
  someMethod(@ParameterDecorator someParameter: number) {
    // If PASS_SOME_ENUM value === 0 => Print parameter decorator value + some text from @ParameterDecorator
    // Else Print parameter decorator value * 50 + some text from @ParameterDecorator
    console.log('this is our message');
  }
}
 */


const ClassDecorator =(constructor: Function)=>{
  console.log(constructor)
}
const PropertyDecorator = (target: Object,proertyKey: string|symbol )=>{
  console.log(proertyKey);
}

const MethodDecorator = (value: number) => {
  if(value === 0){
  return  (target:any, key:string|symbol, descriptor:PropertyDescriptor)=>{
    console.log(`${value}`);
  }
  } 
  return  (target:any, key:string|symbol, descriptor:PropertyDescriptor)=>{
    console.log(`${value*50} = value * 50`);
  }
}

const ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) =>{
  console.log(parameterIndex)
}

 @ClassDecorator
class SomeClass {

  @PropertyDecorator
  property1: string;

  constructor(property1:string){
    this.property1 = property1;
  }

  @MethodDecorator(2)
  someMethod(@ParameterDecorator someParameter: number) {
    console.log(someParameter);
  }}



  const text = new SomeClass('text');

  text.someMethod(2)