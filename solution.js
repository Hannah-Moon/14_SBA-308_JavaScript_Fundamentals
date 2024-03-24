// -------------------------- { Instruction }

// You will create a script that gathers data, processes it, and then outputs a consistent result as described by a specification.

// -------------------------- { Goal }

// Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:

// the ID of the learner for which this data has been collected

// "id": number,

// the learner’s total, weighted average, in which assignments
// with more points_possible should be counted for more
// e.g. a learner with 50/100 on one assignment and 190/200 on another
// would have a weighted average score of 240/300 = 80%.

// "avg": number,

// each assignment should have a key with its ID,
// and the value associated with it should be the percentage that 
// the learner scored on the assignment (submission.score 
// points_possible)

// <assignment_id>: number,

// if an assignment is not yet due, it should not be included in either
// the average or the keyed dictionary of scores

// -------------------------- { Additional Instruction }

// * 1... Course Number Match: If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program. 
// ... "Two Cents": Given data has matching course ID but I have to create the edge case. 

// * 2... You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string?
// ... "Two Cents": Trun the sring into number?? Or find a string with typeof function 

// *3... If an assignment is not yet due, do not include it in the results or the average. Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.

// 4. Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above.

// Exclude with date that are not in the time frame.

// For edge cases'*': Use try/catch and other logic to handle these types of errors gracefully.

// -------------------------- { Simplify the instruction } 
// 1. Returns learner data within objects in an array
// 2. Returns learner id
// 3. Returns learner's weighted average
// 4. Returns learner's assignment averages
// 5. Deducts 10% of the total points possible for late assigments
// 6. Removes assignments that are not yet due from result number 3 

// -------------------------- { Input }


// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  
// -------------------------- { Output }

/* ---- Hide given formula for now 

  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);

  */ 


// -------------------------- { My trial }

function getLearnerData(course, ag, submissions) {

    // Create a new empty object, so learnerData is being initialized as an empty object.
    // So that I can store information about learners 
    let learnerData = {}

    // Simplify the name using 'let' key words, then loop through submissions to gather data
    submissions.forEach(submission => {
        let learnerId = submission.learner_id
        let assignmentId = submission.assignment_id
        let score = submission.submission.score
        //  Use the 'find' method to search for an assignment that has an id property matching the assignmentId variable. 
        // Once found, returns that assignment object.

        // 1. Find the assignment in the "ag.assignments" array where the assignment's ID matches the provided "assignmentId".
        // 2. Get the "due_at" property value of the found assignment.
        // 3. Create a new Date object using the "due_at" value.
        // 4. Store the newly created Date object in the variable "dueDate".

        // let dueDate = new Date(ag.assignments.find(assignment => assignment.id === assignmentId).due_at)

        // 1. Find the assignment in the "ag.assignments" array where the assignment's ID matches the provided "assignmentId".
        // 2. Get the value of the "points_possible" property of the found assignment.
        // 3. Store the value of "points_possible" in the variable "pointsPossible".

        // let pointsPossible = ag.assignments.find(assignment => assignment.id === assignmentId).points_possible

        // Hold off above solutiona and try this try/catch code. 

        let dueDate
        let pointsPossible

        try {
            const foundAssignment = ag.assignments.find(assignment => assignment.id === assignmentId);
            if (!foundAssignment) {
                throw new Error('The assignment was not under 12345-Fundamentals of JavaScrip.');
            }
            dueDate = new Date(foundAssignment.due_at);
            pointsPossible = foundAssignment.points_possible;

        // Skip the submission if assignment not found.
        } catch (error) {
            console.error(`Sorry, we don't find an assignment: ${error.message}`);
            return; 
        }

        // Check if the assignment due date has passed and skip this assignment if the due date hasn't passed
        if (dueDate > new Date()) {
            return; 
        }else{
        }

        // Initialize data for new learners and store individual assignment scores.
        if (!learnerData[learnerId]) {
            learnerData[learnerId] = {
                id: learnerId,
                totalScore: 0,
                totalPointsPossible: 0,
                assignmentScores: {}, 
                lateAssignmentPenalty: 0
            }
        }

        // Calculate late submission penalty. If late assignment is found, deduct 10%. 
        const submittedDate = new Date(submission.submission.submitted_at);
        if (submittedDate > dueDate) {
            const latePenalty = (score / pointsPossible) * 0.10 * pointsPossible 
            learnerData[learnerId].lateAssignmentPenalty += latePenalty
        }

        // Update learner's total score and points possible
        learnerData[learnerId].totalScore += score;
        learnerData[learnerId].totalPointsPossible += pointsPossible

        // Store individual assignment scores
        learnerData[learnerId].assignmentScores[assignmentId] = score
    });

    // Calculate weighted average and remove assignments that are not yet due
    const result = Object.values(learnerData).map(learner => {
        const weightedAverage = (learner.totalScore - learner.lateAssignmentPenalty) / (learner.totalPointsPossible - learner.lateAssignmentPenalty)
        return {
            id: learner.id,
            avg: weightedAverage.toFixed(2),
            assignments: learner.assignmentScores
        }
    })

    return result
}

const resultData = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
console.log(resultData)


