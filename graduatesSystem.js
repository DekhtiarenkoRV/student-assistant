export const gradesSystem = [
    {
        type: 'school',
        grades: [1,2,3,4,5,6,7,8,9,10,11,12],
        goodGrades: [9,10,11,12],
        badGrades: [1,2,3,4,5,6,7,8],
        validation: /^(0?[1-9]|1[012])$/
    },
    {
        type: 'school/university',
        grades: [1,2,3,4,5],
        goodGrades: [4,5],
        badGrades: [1,2,3],
        validation: /[1-5]/
    },
    {
        type: 'university',
        grades: Array.from(Array(101).keys()),
        validation: /\b(0*(?:[1-9][0-9]?|100))\b/
    }
]