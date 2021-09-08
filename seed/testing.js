// let tmpArray = []

// for (let i=0; i<5; i++){
//     tmpArray.push({[i]:'test'})
// }
// console.log(tmpArray)

const rawArrayComplete = ['1', '2', '3']


const scratchArr = rawArrayComplete.map((element, index) =>
        {
        const rawArticle = [['foo', 'bar'], ['foo','bar'], ['fooish'], ['barish']] 
        // const rawArticle = [... text.matchAll(re)]
        const artArr = rawArticle.map(element => element[0])
        return {[index]: artArr}
    })
console.log(scratchArr)

const result = scratchArr.map((element) => {
    const artObj ={}
    let counter = 0;
    for (const [country, value] of Object.entries(element)){
        let newArr = value.map((element) => {
            let head ='noFound'
            if (element === 'fooish'){
                head = 'found'
            }
            if (element === 'foo'){
                counter++
            }
            return [head, counter]
        })
        return {[country]: newArr}
    } 

    })

    
console.log(result)


const string = "!5716940\"><span class=\"count\">9 </span>K&ouml;che in Lebensgefahr</a><br>...&rsquo;information sur le retrait d&rsquo;Afghanistan&ldquo;, Nationalversammlung, 26.&nbsp;Februar 2012. 8..., das &auml;hnliche viele Soldaten nach Afghanistan entsandte wie Frankreich, stellte sich....2 Die am Krieg in Afghanistan beteiligten Staaten pflegen einen unterschiedlichen...<br>Le Monde diplomatique vom 08.10.2020, <span>von </span><span>Antoine Ory</span></li><li><a href=\""

let headStart = string.indexOf('</span>')
let headEnd = string.indexOf('</a><br>')
let head = string.slice((headStart+7),(headEnd))


const stringUtf = "D&eacute;j&agrave;-vu in Myanmar"
const escapeHTML = str => str.replace(/(&.uml;)|(&szlig;)|(&eacute;)|(&aacute;)|(&agrave;)|(&egrave;)/g, 
    tag => ({
        '&Auml;': 'Ä',
        '&auml;': 'ä',
        '&Ouml;': 'Ö',
        '&ouml;': 'ö',
        '&Uuml;': 'Ü',
        '&uuml;': 'ü',
        '&szlig;': 'ß',
        '&eacute;': 'é',
        '&aacute;': 'á',
        '&agrave;': 'à',
        '&egrave;':'è'
      }[tag]));

    console.log(escapeHTML(stringUtf))

