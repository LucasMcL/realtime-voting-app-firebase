{
	document.querySelector('.choice_a button').addEventListener('click', onVote)
	document.querySelector('.choice_b button').addEventListener('click', onVote)

	// Initialize Firebase
	firebase.initializeApp({
	  apiKey: "AIzaSyBmuQFkAulcPVXQPZ3XmBh8EogP0rEZiEU",
	  authDomain: "voting-app-8cc3d.firebaseapp.com",
	  databaseURL: "https://voting-app-8cc3d.firebaseio.com",
	  storageBucket: "voting-app-8cc3d.appspot.com",
	  messagingSenderId: "166924303896"
	});

	function onVote(evt) {
		// Submit vote
			// What button I clicked
			const voteFor = evt.target.closest('.choice').dataset.value
			const url = 'https://voting-app-8cc3d.firebaseio.com/votes.json'
			// Get current count
			fetch(url)
				.then(stream => stream.json())
				.then(data => {
					// Patch the new count
					const newCount = data && data[voteFor] ? data[voteFor] + 1 : 1
					// data is the if statement
						// if data = true, evaluate newCount = data[voteFor] + 1
						// else evaluate newCount = 1
					fetch(url, {
						method: 'PATCH',
						body: JSON.stringify({ [voteFor]: newCount })
					})
					.then(() => {
						document.querySelectorAll('h3').forEach(h => {
							const total = Object.values(data).reduce((acc, val) => acc + val)
							// returns array of values in object
							const current = data[h.closest('.choice').dataset.value]
							h.innerText = Math.round(current / total * 100) + '%'
						})
					})
				})
			// Then hide buttons
		document.querySelectorAll('button').forEach(btn => btn.remove())
		// Show current vote totals
	}
}

//for each works like a for loop
// method on all arrays and node lists
// takes function as argument



