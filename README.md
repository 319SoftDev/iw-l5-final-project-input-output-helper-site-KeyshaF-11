[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22408694&assignment_repo_type=AssignmentRepo)
# Prompt
The magic of a website comes together when a user can interact with it. The website becomes more fun, human, and helpful. Interactivity can be explained as inputs and outputs. The user inputs some information and the website reacts by giving some output back to the user.

## Directions 
Create a website with at least 3 inputs and at least 1 specific output that is based on the inputs. The website should be a toll that helps people in some way. If you can see yourself using it, you're on the right track. Here are some examples:

- A tip calculator, final grade calculator, or budget tracker
- A personality quiz, "which character are you" quiz, or practice quiz for another class
- An order form for your favorite cuisine (See exemplar),
- A calorie counter

All of these are just ideas. If they spark another idea with input and output that you are more passionate about, be sure to get it approved by your teacher.

## Requirements

- Include at least 3 inputs. They can be buttons, text, checkboxes, etc. Here are some more input examples.
- Include at least 1 output. This is typically implemented with innerHTML, but you can "un-hide" certain divs as a way of displaying a result as well.
- Style your page using styling techniques you've learned so far. Using Bulma, Flexbox, Grid, and other CSS properties are all great ways to make your page look beautiful. Use which ever you see fit.

## Extensions
### Mild

Find 2 or 3 other sites similar to yours if you haven't already. Notice the inputs they use, the way they display the output, and the way everything is styled (colors, hover effects, transition speeds, etc). Incorporate at least 2 things you notice that you don't already have.

### Medium

Add a layer to your site. How can you take your helper to the next level? Can you change it so it helps multiple people at the same time? Can you add a feature that the user may not have realizes they needed? Here are some examples:

- If you have a tip calculator, can you split the tip by multiple people? What if each person got to pick their own percentage?
- If you have a quiz, is there an option to play again? Is there a long version and a short version? An optional bonus question?
- If you're making a budget tracker or calorie counter, is there a conservative and liberal option? Is there a recommended default?
- If you're calculating a final grade, is there an option to synthesize multiple classes? Can you compare it with the average grade according to state records? Can you compare your grades with a friend?

### Spicy

Functions are best used when there are multiple lines of code being identically repeated in different parts of the program. Skim through your code. If you find any parts that are repeated, put them in a function and call the function instead. For example, if you have something like this:

```
let num = 0;

// grouping appearing for the first time
num += 1;
console.log(num);

num += 100;

// same 2 instructions repeated
num += 1;
console.log(num);
```
You may want to put it in a function like this:
```
let num = 0;
const add1print = (variable) => {
    variable += 1;
    console.log(variable);   
}

add1print(num);
num += 100;
add1print(num);
```
