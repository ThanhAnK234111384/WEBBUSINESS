var student = `
  <student>
      <stuID>987456</stuID>
      <stuname>Marie Curie</stuname>
      <birthday>7/11/1867</birthday>
      <gender>Woman</gender>
  </student>
`;

var parser = new DOMParser();
var doc = parser.parseFromString(student, "text/xml");
var stuID = doc.getElementsByTagName("stuID")[0].childNodes[0].nodeValue;
var stuname = doc.getElementsByTagName("stuname")[0].childNodes[0].nodeValue;
var birthday = doc.getElementsByTagName("birthday")[0].childNodes[0].nodeValue;
var gender = doc.getElementsByTagName("gender")[0].childNodes[0].nodeValue;

function add(obj) {
  obj.style.backgroundColor = "blue";
  obj.style.color = "white";
}

function process(obj) {
  obj.style.backgroundColor = "white";
  obj.style.color = "black";
}

document.getElementById("stuID").innerHTML = stuID;
document.getElementById("stuname").innerHTML =stuname;
document.getElementById("birthday").innerHTML = birthday;
document.getElementById("gender").innerHTML = gender;
