const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreationDate = () => {
	
	const date = new Date(Date.now());
  
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
  
	const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	return dateString.trim(); // supprimer les espaces et les nouvelles lignes du début et de la fin de la chaîne de caractères
  }
  
const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: CreationDate()
    }
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
