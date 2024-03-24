// Given Data --- SBA 308: JavaScript Fundamentals

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

  
// -------------------------- { Desired Output }


  // function getLearnerData(course, ag, submissions) {
  //   // here, we would process this data to achieve the desired result.
  //   const result = [
  //     {
  //       id: 125,
  //       avg: 0.985, // (47 + 150) / (50 + 150)
  //       1: 0.94, // 47 / 50
  //       2: 1.0 // 150 / 150
  //     },
  //     {
  //       id: 132,
  //       avg: 0.82, // (39 + 125) / (50 + 150)
  //       1: 0.78, // 39 / 50
  //       2: 0.833 // late: (140 - 15) / 150
  //     }
  //   ];
  
  //   return result;
  // }
  
  // const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  // console.log(result);


  // -------------------------- { My 1st attempt }

  function getLearnerData(course, ag, submissions) {

    // Store information about learners
    const learnerData = {}

    // Loop through submissions to gather data
    submissions.forEach(submission => {
        const learnerId = submission.learner_id
        const assignmentId = submission.assignment_id
        const score = submission.submission.score
        const dueDate = new Date(ag.assignments.find(assignment => assignment.id === assignmentId).due_at)
        const pointsPossible = ag.assignments.find(assignment => assignment.id === assignmentId).points_possible

        // Check if the assignment due date has passed and skip this assignment if the due date hasn't passed
        if (dueDate > new Date()) {
            return; 
        }

        // Initialize data for new learners and store individual assignment scores.
        if (!learnerData[learnerId]) {
            learnerData[learnerId] = {
                id: learnerId,
                totalScore: 0,
                totalPointsPossible: 0,
                assignmentScores: {}, 
                lateAssignmentPenalty: 0
            };
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