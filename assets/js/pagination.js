$(function(){

	/***Ne montrer que trois élément dans chaque onglet***/
	var numberOfImages = $('#loop .list-img').length;	//crée une variable numberOfImages qui sélectionne l'élément avec la classe list-img dans l'élément avec l'id loop et conte les
	console.log(numberOfImages);
	var limitPerPage = 3;
	$('#loop .list-img:gt(' + (limitPerPage - 1) +')').hide();	//:gt() signifie que l'Éléments dont l'index est supérieur à (greater than) l'index spécifié
	// limitPerPage est un tableau commençant par 0 donc renvois 4 éléments (dans ma var limitPerPage), pour laisser 3 élément on doit diminuer les élément afficher dans le tableau

	/***Partager les éléments par page***/
	var totalPages = Math.round(numberOfImages / limitPerPage); // math.round() arrondi à l'entier le plus proche
	console.log(totalPages);
	$('.pagination').append('<li class="current-page active page-item"><a class="page-link" href="#">' + 1 + '</a></li>'); // append() signifie qu'on insère du contenu à la fin de la sélection ;
	
	/***faire une boucle pour ajouter des paginations par à port aux nombres de pages besoin***/
	for (var i = 2; i <= totalPages; i++) {
		$('.pagination').append('<li class="current-page page-item"><a class="page-link" href="#">' + i + '</a></li>');
		console.log(i);
	}
	$('.pagination').append('<li id="next-page"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>')
	$('.pagination li.current-page').on('click', function() {
		
		if($(this).hasClass('active')){
			return false;
		} else {
			var currentPage = $(this).index();
			console.log('Tu cliques sur ' + currentPage);
			$('.pagination li').removeClass('active');
			$(this).addClass('active');
			$('#loop .list-img').hide();
			var grandTotal = limitPerPage * currentPage;
			for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
				$('#loop .list-img:eq(' + i + ')').show();
			}
		}	
	});
	$('#next-page').on('click', function() {
		var currentPage = $('.pagination li.active').index();
		if (currentPage === totalPages) {
			return false;
		} else {
			currentPage++;
			$('.pagination li').removeClass('active');
			$('#loop .list-img').hide();
			var grandTotal = limitPerPage * currentPage;
			for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
				$('#loop .list-img:eq(' + i + ')').show();
			}
			$('.pagination li.current-page:eq(' + (currentPage - 1) + ')').addClass('active');
		}
	});
	$('#previous-page').on('click', function() {
		var currentPage = $('.pagination li.active').index();
		if (currentPage === 1) {
			return false;
		} else {
			currentPage--;
			$('.pagination li').removeClass('active');
			$('#loop .list-img').hide();
			var grandTotal = limitPerPage * currentPage;
			for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
				$('#loop .list-img:eq(' + i + ')').show();
			}
			$('.pagination li.current-page:eq(' + (currentPage - 1) + ')').addClass('active');
		}
	});

	/***Enlever les dièses dans l'url quand tu cliques sur un lien***/
	/*ici je remplace javascript:void[0] (l'apparition du # dans l'url), plus clean 
	(& empèche que quand tu cliques sur le lien cela remonte en haut)*/

	$('.page-link').on('click',function(e) {	//Cette parti ce met à la fin car j'ai créé les boutton dans mon js
		e.preventDefault();
		console.log('test');
	});

});