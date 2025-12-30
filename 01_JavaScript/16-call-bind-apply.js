
const student1 = {
    name: "Hemant Sah",
    rollno: 250,

    getStudentDetails: function(age, department){
        console.log(this.name, " ", this.rollno, " ",age, " ", department);       
    }
}
// student1.getStudentDetails(23, "IT"); // Hemant Sah   25   23   IT
// in this e.g `this` is pointing to `student1` object but we want it to pointing to other objects. How do we do it? By using call(), apply(), bind().

const student2 = {
    name: "piyush",
    rollno: 300,
}

// call: it will execute the fn immediately(run immediately)
student1.getStudentDetails.call(student2, 21, "CE"); // piyush   300   21   CE

// apply: it will execute the fn immediately(run immediately)
student1.getStudentDetails.apply(student2, [21, "CE"]); // piyush   300   21   CE

// bind: it will make a copy of student2 and binds it to student1 object and return a fn(new).
const getStud = student1.getStudentDetails.bind(student2, 21, "CE"); // piyush   300   21   CE
getStud();


//The only difference between call and bind is call immediately execute the fn whereas bind return a new fn.
// The only difference between call and apply is the way how we pass the argument.

// call:
//1.  Ek fn ke properties ko dushre fn ke properties ko overwrite ya fn borrowing karne mai help karte hai.
//2. current execution context ko kisi aur fn ko pass kar deta hai.
// Call pass the current execution context to other fn

// bind