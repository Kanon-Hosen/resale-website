import React from 'react';

const BlogComp = () => {
    return (
        <div className='px-8 my-10 md:px-16'>
            <h1 className='text-center text-5xl font-bold mb-5'>Blog</h1>
            <div className='mt-3'>
                <p className='text-2xl my-2 font-semibold'><strong>1. </strong>What are the different ways to manage a state in a React application?</p>
                <p><strong>Ans:  </strong>Managing state in your React apps isn’t as simple as using useState or useReducer.useState is the first tool you should reach for to manage state in your components.  useReducer is another option that can be used for either local or global state. It is similar in many ways to useState under the hood, although instead of just an initial state it accepts a reducer.</p>
            </div>
            <div className='mt-5'>
                <p  className='text-2xl my-2 font-semibold'><strong>2. </strong>How does prototypical inheritance work?</p>
                <p><strong>Ans:  </strong>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
            </div>
            <div className='mt-5'>
                <p  className='text-2xl my-2 font-semibold'><strong>3. </strong>What is a unit test? Why should we write unit tests?</p>
                <p><strong>Ans:  </strong>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
            </div>
            <div className='mt-5'>
                <p  className='text-2xl my-2 font-semibold'><strong>4. </strong>React vs. Angular vs. Vue?</p>
                <p><strong>Ans:  </strong>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.</p>
            </div>
        </div>
    );
};

export default BlogComp;