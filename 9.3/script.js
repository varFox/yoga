let age = document.getElementById('age');
 
function showUser(surname, name) {
  this.value = age.value;
  alert("Пользователь " + surname + " " + name + ", её возраст " + this.value);
}
 
showUser('Соплякова', 'Эльвира');