function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}


var Market = {
	apples: randomNumber(1000,9999),
	oranges: randomNumber(1000,9999),
	bananas: randomNumber(1000,9999),
	pears: randomNumber(1000,9999)
};
var Person = {
	apples: [],
	oranges: [],
	bananas: [],
	pears: [],
	budget: 50000
};
function priceChange(price){
	price += randomNumber(-3000,3000);
	if (price > 9999){
		price = 9999;
	}else if (price < 1000){
		price = 1000;
	}
	price = Math.round(price * 100) / 100;
	return price;
}

function avgArray (array){
	if (array.length == 0){
		return 0;
	}
	var sum = array.reduce(function(a,b){
		return a + b;
	});
	return Math.round((sum / array.length)*100) / 100;
}

$(document).ready(function(){
	$("#apples").append("<br>Price: $<p id='markAp'>" + Market.apples + "</p>");
	$("#oranges").append("<br>Price: $<p id='markOr'>" + Market.oranges + "</p>");
	$("#bananas").append("<br>Price: $<p id='markBa'>" + Market.bananas + "</p>");
	$("#pears").append("<br>Price: $<p id='markPe'>" + Market.pears + "</p>");
	$("#userInfo").append("<p>Budget: $" + Person.budget + "</p>");

	setInterval(function(){
		for (var fruit in Market){
			Market[fruit]=priceChange(Market[fruit]);
		}

		$("#markAp").html(Market.apples);
		$("#markOr").html(Market.oranges);
		$("#markBa").html(Market.bananas);
		$("#markPe").html(Market.pears);
	}, 10000);

		$(".btn").on("click",function (){
		if (Person.budget - Market[this.id] < 0){
			alert("Insufficient funds");
		}else {
			Person[this.id].push(Market[this.id]);
			Person.budget -= Market[this.id];
			Person.budget = Math.round(Person.budget * 100) / 100;
			$("#userInfo").html("<p>Budget: $" + Person.budget + "</p><p>Black Dragons: " + Person.apples.length + " at an average price of $" + avgArray(Person.apples) + "</p>" + "<p>Red Dragons: " + Person.oranges.length + " at an average price of $" + avgArray(Person.oranges) + "</p>" + "<p>High Dragons: " + Person.bananas.length + " at an average price of $" + avgArray(Person.bananas) + "</p>" + "<p>Gold Dragons: " + Person.pears.length + " at an average price of $" + avgArray(Person.pears) + "</p>");
		}

		});

	$(".sell").on("click", function(){
		var fruitId = this.id.slice(4);
		if (Person[fruitId].length > 0){
			Person[fruitId].shift();
			Person.budget += Market[fruitId];
			Person.budget = Math.round(Person.budget * 100) / 100;
			$("#userInfo").html("<p>Budget: $" + Person.budget + "</p><p>Black Dragons: " + Person.apples.length + " at an average price of $" + avgArray(Person.apples) + "</p>" + "<p>Red Dragons: " + Person.oranges.length + " at an average price of $" + avgArray(Person.oranges) + "</p>" + "<p>High Dragons: " + Person.bananas.length + " at an average price of $" + avgArray(Person.bananas) + "</p>" + "<p>Gold Dragons: " + Person.pears.length + " at an average price of $" + avgArray(Person.pears) + "</p>");
		}else{
			alert("You can't sell what you don't have!");
		}
	});
});

