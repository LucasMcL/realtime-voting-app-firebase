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
			const voteFor = evt.target.closest('.choice').dataset.value
			const url = 'https://voting-app-8cc3d.firebaseio.com/votes.json'
			firebase.database().ref('votes').once('value')
				.then(snap => snap.val())
				.then(data => {
					const newCount = data && data[voteFor] ? data[voteFor] + 1 : 1
					return firebase.database().ref('votes').update({ [voteFor]: newCount })
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

	firebase.database().ref('votes').on('value')
		.then(snap => snap.val())
		.then(data => document.querySelectorAll('h3').forEach(h => {
			const total = Object.values(data).reduce((acc, val) => acc + val)
			const current = data[h.closest('.choice').dataset.value]
			h.innerText = Math.round(current / total * 100) + '%'
		}))

	function onUpdate(snap) {
		const data = snap.val()
		snap => snap.val()
	}
}























