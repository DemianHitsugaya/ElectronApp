const remote = require('electron').remote
const main = remote.require('./main.js')

$(function(){

	let query = 'Select * from usuarios'

	main.connection.query(query,function(err,rows,fields){
		if (err) {
			console.log(err)
			console.log('Error al consultar la data ')
			return
		}

		let row = rows[0]
		$('.stats').append('Usuario: <span>'+row.Nombre+'</span>')
		$('.stats').append('Ultima conexin: <span>'+row.UltimoLogin+'</span>')

	})

	main.closeConnection()



	
	const os = require('os')
	const prettyBytes = require('pretty-bytes')

	$('.stats').append('Numero de Procesadores: <span>'+os.cpus().length+'</span>')
	$('.stats').append('Memoria libre: <span>'+prettyBytes(os.freemem())+'</span>')

	const ul = $('.flipster ul');

	$.get('https://enupal.com/blog/rss',function(response){

		const rss = $(response)

		rss.find('item').each(function(){

			const item = $(this)
			const content =item.find('description').html().split('</a></div>')[0]+'</a></div>'
			const urlRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;

			const imageSource = content.match(urlRegex)[1]

			const li = $('<li><img /><a target="_blank"></a></li>')

			li.find('a').attr('href',item.find('link').text())
			.html('<br>'+item.find('title').text())

			li.find('img').attr('src',imageSource)
			li.find('img').attr('width',400)
			li.find('img').attr('height',300)

			li.appendTo('ul')
		});

		$('.flipster').flipster({
			style:'carousel'
		});

	});
});