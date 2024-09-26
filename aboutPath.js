const path = require('path')

console.log("=============================================");

console.log(path.basename('/foo/bar/baz/asdf/quux.html')); // 'quux.html'
console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html')); // 'quux'


const fullPath = path.join('folder1', 'folder2', 'file.txt');
console.log(fullPath);

console.log("=============================================")



const absolutePath = path.resolve('folder1', 'folder2', 'file.txt');
console.log(absolutePath); // give whole path from root unlike fullpath


console.log("=====================================================")


console.log(path.dirname('/foo/bar/baz/asdf/quux.html'));


console.log("======================================================");

console.log(path.extname('index.html')); // '.html'
console.log(path.extname('index')); // ''

console.log("=======================================================");


console.log(path.isAbsolute(fullPath)); // true
console.log(path.isAbsolute(absolutePath)); // false


console.log("=================================================")

const parsedPath = path.parse('/foo/bar/baz/asdf/quux.html');
console.log(parsedPath);
// {
//   root: '/',
//   dir: '/foo/bar/baz/asdf',
//   base: 'quux.html',
//   ext: '.html',
//   name: 'quux'
// }


console.log("==================================================")

const pathObj = {
    dir: '/foo/bar/baz/asdf',
    base: 'quux.html'
};
const formattedPath = path.format(pathObj);
console.log(formattedPath); // '/foo/bar/baz/asdf/quux.html'



console.log(path.resolve(__dirname,'reeloheader.png'))