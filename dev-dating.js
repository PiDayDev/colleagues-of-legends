function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const count = 24
const people = [
    'Alice', 'Bob', 'Chester', 'Daniel', 'Emma', 'Frank', 'Guillaume', 'Herman', 'Ivana', 'Jack', 'Kevin', 'Lisa',
    'Marge', 'Nora', 'Otto', 'Paul', 'Rose', 'Sarah', 'Tom', 'Uma', 'Vincent', 'William', 'Xavier', 'Yvonne', 'Zeke'
].slice(0, count)
let array = Array(count).fill(0).map(e => Array(count).fill(0).map(x => Math.floor(100 + 900 * Math.random())))
console.log(` `.repeat(13) + people.map(e => e.substring(0, 3)).join` `)
array.forEach((row, k) => console.log(people[k].padStart(12) +' '+ row.join` `))

console.log('-')
const groupSize = 4
const candidates = []
for (let i = 1; i < 30000; i++) {
    let index = Array(count).fill(0).map((e, i) => i);
    shuffle(index);
    let score = 0
    const groups = []
    for (let j = 0; j < count; j += groupSize) {
        const group = index.slice(j, j + groupSize)
        groups.push(group.map(it => people[it]))
        for (let p1 of group) {
            for (let p2 of group) {
                if (p1 !== p2) {
                    score += array[p1][p2]
                }
            }
        }
    }
    candidates.push({groups, score})
}
candidates.sort((a, b) => a.score - b.score)
candidates.slice(0, 4).forEach(it => {
    const {groups, score} = it

    console.log(score, groups);
})
